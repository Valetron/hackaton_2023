#include "NeuralNetwork.h"

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

        cv::imwrite("../../TMP/client/public/zavod.jpg", frame);
    }
}
