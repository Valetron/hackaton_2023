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
    _net.setPreferableBackend(cv::dnn::DNN_BACKEND_OPENCV);
    _net.setPreferableTarget(cv::dnn::DNN_TARGET_CPU);
#endif
}

PadInfo NeuralNetwork::letterbox(cv::Mat& img, const cv::Size& new_shape, const cv::Scalar& color, bool _auto, bool scaleFill, bool scaleup, int stride)
{
    float width = img.cols;
    float height = img.rows;
    float r = cv::min(new_shape.width / width, new_shape.height / height);

    if (!scaleup)
        r = cv::min(r, 1.0f);

    int new_unpadW = int(round(width * r));
    int new_unpadH = int(round(height * r));

    int dw = new_shape.width - new_unpadW;
    int dh = new_shape.height - new_unpadH;
    if (_auto)
    {
        dw %= stride;
        dh %= stride;
    }

    dw /= 2;
    dh /= 2;
    cv::Mat dst;
    resize(img, img, cv::Size(new_unpadW, new_unpadH), 0, 0, cv::INTER_LINEAR);

    int top = int(round(dh - 0.1));
    int bottom = int(round(dh + 0.1));
    int left = int(round(dw - 0.1));
    int right = int(round(dw + 0.1));

    copyMakeBorder(img, img, top, bottom, left, right, cv::BORDER_CONSTANT, color);

    return {r, top, left};
}

Detection NeuralNetwork::detect(cv::Mat& img)
{
    cv::Mat im;
    img.copyTo(im);
    PadInfo padInfo = letterbox(im, INPUT_SIZE, BLACK, false, false, true, 32);

    cv::Mat blob;
    cv::dnn::blobFromImage(im, blob, 1 / 255.0f, cv::Size(im.cols, im.rows), cv::Scalar(0, 0, 0), true, false);
    std::vector<std::string> outLayerNames = _net.getUnconnectedOutLayersNames();
    std::vector<cv::Mat> outs;

    _net.setInput(blob);
    _net.forward(outs, outLayerNames);

    return {padInfo, outs};
}

void NeuralNetwork::postProcess(cv::Mat &img, Detection &detection, Colors &cl)
{

    PadInfo padInfo = letterbox(img, INPUT_SIZE, BLACK, false, false, true, 32);
    std::vector<cv::Mat> outs = detection.detection;
    cv::Mat out(outs[0].size[1], outs[0].size[2], CV_32F, outs[0].ptr<float>());

    std::vector<cv::Rect> boxes;
    std::vector<float> scores;
    std::vector<int> indices;
    std::vector<int> classIndexList;

    for (int r = 0; r < out.rows; ++r)
    {
        float cx = out.at<float>(r, 0);
        float cy = out.at<float>(r, 1);
        float w = out.at<float>(r, 2);
        float h = out.at<float>(r, 3);
        float sc = out.at<float>(r, 4);

        cv::Mat confs = out.row(r).colRange(5, out.row(r).cols);
        confs *= sc;
        double minV, maxV;
        cv::Point minI, maxI;
        minMaxLoc(confs, &minV, &maxV, &minI, &maxI);
        scores.push_back(maxV);
        boxes.push_back(cv::Rect(cx - w / 2, cy - h / 2, w, h));
        indices.push_back(r);
        classIndexList.push_back(maxI.x);
    }

    cv::dnn::NMSBoxes(boxes, scores, CONF_THRESHOLD, NMS_THRESHOLD, indices);

    std::vector<int> clsIndexs;
    for (int i = 0; i < indices.size(); ++i)
        clsIndexs.push_back(classIndexList[indices[i]]);


    drawPredection(img, boxes, scores, clsIndexs, indices, cl);
}

void NeuralNetwork::drawPredection(cv::Mat& img, std::vector<cv::Rect>& boxes, std::vector<float> &scores, std::vector<int> &clsIndexs, std::vector<int> &ind, Colors &cl)
{
    for (int i = 0; i < ind.size(); ++i)
    {
        cv::Rect rect = boxes[ind[i]];
        float score = scores[ind[i]];
        std::string name = CLASSES[clsIndexs[i]];
        int color_ind = clsIndexs[i] % 20;
        cv::Scalar color = cl.palette[color_ind];
        rectangle(img, rect, color);
        char s_text[80];
        sprintf(s_text, "%.2f", round(score * 1e3) / 1e3);
        std::string label = name + " " + s_text;

        int baseLine = 0;
        cv::Size textSize = getTextSize(label, cv::FONT_HERSHEY_PLAIN, 0.7, 1, &baseLine);
        baseLine += 2;
        rectangle(img, cv::Rect(rect.x, rect.y - textSize.height, textSize.width + 1, textSize.height + 1), color, -1);
        putText(img, label, cv::Point(rect.x, rect.y), cv::FONT_HERSHEY_PLAIN, 0.7, cv::Scalar(255, 255, 255), 1);
    }
//    cv::imshow("rst", img);
//    cv::waitKey(0);
}

//void NeuralNetwork::run(const std::string& video)
//{
//    auto cap = cv::VideoCapture(video);

//    if (!cap.isOpened())
//        throw std::runtime_error("Can't open video");

//    cv::Mat frame;
//    while(cap.isOpened())
//    {
//        cap >> frame;

//        cv::imshow("test", frame);

//        if (cv::waitKey(25) == 27)
//            break;

//    }
//}
