#pragma once

#include <string>
#include <vector>

#include <opencv2/core.hpp>
#include <opencv2/videoio.hpp>
#include <opencv2/highgui.hpp>
#include <opencv2/dnn.hpp>
#include <opencv2/imgproc.hpp>

namespace
{
//constexpr float NmsThreshold { 0.25f };
constexpr int cellDimention { 16 }; // xmin, ymin, xamx, ymax, box_score, x1, y1, ... ,x5, y5, face_score

const cv::Size INPUT_SIZE{640, 640};
constexpr double INPUT_SCALE { 1.0 / 255.0 };
const std::vector<std::string> CLASSES{"person", "jacket", "pants"};
}

class NeuralNetwork final
{
public:
    NeuralNetwork() = default;
    NeuralNetwork(const std::string& model);
    void run(const std::string& video);
    void detect(const cv::Mat& image);

private:
    void initModel(const std::string& model);
    void drawPred(float conf, int left, int top, int right, int bottom, cv::Mat frame, int classid);

private:
    cv::dnn::Net _net;
};
