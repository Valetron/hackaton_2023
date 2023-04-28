#include "NeuralNetwork.h"

NeuralNetwork::NeuralNetwork(const std::string& model)
{
    initModel(model);
}

void NeuralNetwork::initModel(const std::string& model)
{
    _net = cv::dnn::readNetFromONNX(model);

    if (_net.empty())
        throw std::invalid_argument("Model not initialized");

#ifdef CUDA_SUPPORT
    _net.setPreferableBackend(cv::dnn::DNN_BACKEND_CUDA);
    _net.setPreferableTarget(cv::dnn::DNN_TARGET_CUDA);
#else
    _net.setPreferableBackend(cv::dnn::DNN_BACKEND_DEFAULT);
    _net.setPreferableTarget(cv::dnn::DNN_TARGET_CPU);
#endif
}

void NeuralNetwork::drawPred(float conf, int left, int top, int right, int bottom, cv::Mat& frame, int classid)
{
    cv::rectangle(frame, cv::Point(left, top), cv::Point(right, bottom), cv::Scalar(0, 0, 255), 2);

    //Get the label for the class name and its confidence
    std::string label = cv::format("%.2f", conf);
    label = CLASSES[classid] + ":" + label;

    //Display the label at the top of the bounding box
    int baseLine;
    cv::Size labelSize = getTextSize(label, cv::FONT_HERSHEY_SIMPLEX, 0.5, 1, &baseLine);
    top = cv::max(top, labelSize.height);
    rectangle(frame, cv::Point(left, top - int(1.5 * labelSize.height)), cv::Point(left + int(1.5 * labelSize.width), top + baseLine), cv::Scalar(0, 255, 0));
    cv::putText(frame, label, cv::Point(left, top), cv::FONT_HERSHEY_SIMPLEX, 0.75, cv::Scalar(0, 255, 0), 1);
}

void NeuralNetwork::detect(cv::Mat& image)
{
    cv::Mat blob = cv::dnn::blobFromImage(image, INPUT_SCALE, INPUT_SIZE, cv::Scalar(0, 0, 0), true, false);
    _net.setInput(blob);

    std::vector<cv::Mat> outs;
    _net.forward(outs, _net.getUnconnectedOutLayersNames());
///////////////////////////////////////////////////////////////////////////////

//    int num_proposal = outs[0].size[0];
//    int nout = outs[0].size[1];
//    if (outs[0].dims > 2)
//    {
//        num_proposal = outs[0].size[1];
//        nout = outs[0].size[2];
//        outs[0] = outs[0].reshape(0, num_proposal);
//    }
//    std::vector<float> confidences;
//    std::vector<cv::Rect> boxes;
//    std::vector<int> classIds;
//    float ratioh = (float)image.rows / INPUT_SIZE.height;
//    float ratiow = (float)image.cols / INPUT_SIZE.width;
//    int row_ind = 0; ///cx,cy,w,h,box_score,class_score
//    float* pdata = (float*)outs[0].data;
//    for (int n = 0; n < num_proposal; ++n)
//    {
//        float box_score = pdata[4];
//        if (box_score > 0.05f)
//        {
//            cv::Mat scores = outs[0].row(row_ind).colRange(5, nout);
//            cv::Point classIdPoint;
//            double max_class_socre;
//            // Get the value and location of the maximum score
//            minMaxLoc(scores, 0, &max_class_socre, 0, &classIdPoint);
//            max_class_socre *= box_score;
//            if (max_class_socre > 0.05f)
//            {
//                const int class_idx = classIdPoint.x;
//                float cx = pdata[0] * ratiow;  ///cx
//                float cy = pdata[1] * ratioh;   ///cy
//                float w = pdata[2] * ratiow;   ///w
//                float h = pdata[3] * ratioh;  ///h

//                int left = int(cx - 0.5 * w);
//                int top = int(cy - 0.5 * h);

//                confidences.push_back((float)max_class_socre);
//                boxes.push_back(cv::Rect(left, top, (int)(w), (int)(h)));
//                classIds.push_back(class_idx);
//            }
//        }
//        ++row_ind;
//        pdata += nout;
//    }

//    std::vector<int> indices;
//    cv::dnn::NMSBoxes(boxes, confidences, 0.05f, 0.05f, indices);
//    for (size_t i = 0; i < indices.size(); ++i)
//    {
//        int idx = indices[i];
//        cv::Rect box = boxes[idx];
//        drawPred(confidences[idx], box.x, box.y, box.x + box.width, box.y + box.height, image, classIds[idx]);
//    }
//    cv::imshow("img", image);
//    cv::waitKey(0);

///////////////////////////////////////////////////////////////////////////////////
    using Landmarks = std::vector<int>;
    const float scalex = static_cast<float>(image.cols) / INPUT_SIZE.width;
    const float scaley = static_cast<float>(image.rows) / INPUT_SIZE.height;
    const float* data = reinterpret_cast<float*>(outs[0].data);
    const auto nCells = outs[0].size().width;

    std::vector<cv::Rect> resultBoxes;
    std::vector<float> resultConfidences;
    std::vector<Landmarks> resultLandmarks;
    for (int cell = 0; cell < nCells; ++cell)
    {
        const auto objConfidence = data[cellDimention * cell + 4];
        if (objConfidence < 0.05f)
            continue;
        const auto classConfidence = data[cellDimention * cell + 15];
        const auto totalConfidence = objConfidence * classConfidence;
        if (totalConfidence < 0.05f)
            continue;

        const auto w = static_cast<int>(data[cellDimention * cell + 2] * scalex);
        const auto h = static_cast<int>(data[cellDimention * cell + 3] * scaley);
        const auto x = static_cast<int>(data[cellDimention * cell + 0] * scalex - 0.5 * w);
        const auto y = static_cast<int>(data[cellDimention * cell + 1] * scaley - 0.5 * h);
        const cv::Rect faceBoundingBox = cv::Rect(x, y, w, h) & cv::Rect(0, 0, image.cols, image.rows);

        Landmarks cellLandmarks;
        cellLandmarks.reserve(10);
        for (int k = 5; k < 15; k+=2)
        {
            cellLandmarks.push_back(static_cast<int>(data[cellDimention * cell + k] * scalex));
            cellLandmarks.push_back(static_cast<int>(data[cellDimention * cell + k + 1] * scaley));
        }

        resultConfidences.push_back(totalConfidence);
        resultBoxes.emplace_back(faceBoundingBox);
        resultLandmarks.emplace_back(std::move(cellLandmarks));
    }

    std::vector<int> indices;
    cv::dnn::NMSBoxes(resultBoxes, resultConfidences, 0.05f, 0.25f, indices);

    for (size_t i = 0; i < indices.size(); ++i)
        {
            int idx = indices[i];
            cv::Rect box = resultBoxes[idx];
            drawPred(confidences[idx], box.x, box.y, box.x + box.width, box.y + box.height, image, classIds[idx]);
        }

}

void NeuralNetwork::run(const std::string& video)
{
    auto cap = cv::VideoCapture(video);

    if (!cap.isOpened())
        throw std::runtime_error("Can't open video");

    cv::Mat frame;
    while(cap.isOpened())
    {
        cap >> frame;

        cv::imshow("test", frame);

        if (cv::waitKey(25) == 27)
            break;

//        cv::imwrite("../../TMP/client/public/exp/labels/vidos.png", frame);
    }
}
