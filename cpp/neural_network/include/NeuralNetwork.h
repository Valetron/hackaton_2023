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
const float NMS_THRESHOLD{ 0.25f };
const float CONF_THRESHOLD{0.45f};
const cv::Size INPUT_SIZE{640, 640};
constexpr double INPUT_SCALE{ 1.0 / 255.0 };
const std::vector<std::string> CLASSES{"person", "jacket", "pants"};
const cv::Scalar BLACK{0, 0, 0};
}

struct PadInfo
{
    float scale;
    int top;
    int left;
};

struct Detection
{
    PadInfo info;
    std::vector<cv::Mat> detection;
};

class Colors
{
public:
    std::vector<std::string> hex_str;
    std::vector<cv::Scalar> palette;
    int n = 20;
    Colors():hex_str(20,"")
    {
        this->hex_str = {
                         "FF3838", "FF9D97", "FF701F", "FFB21D", "CFD231", "48F90A", "92CC17", "3DDB86", "1A9334", "00D4BB",
                         "2C99A8", "00C2FF", "344593", "6473FF", "0018EC", "8438FF", "520085", "CB38FF", "FF95C8", "FF37C7"};
        for (auto &ele : this->hex_str)
        {
            palette.push_back(hex2rgb(ele));
        }
    }
    cv::Scalar hex2rgb(std::string &hex_color)
    {
        int b, g, r;
        sscanf(hex_color.substr(0, 2).c_str(), "%x", &r);
        sscanf(hex_color.substr(2, 2).c_str(), "%x", &g);
        sscanf(hex_color.substr(4, 2).c_str(), "%x", &b);
        return cv::Scalar(b, g, r);
    }
};

class NeuralNetwork final
{
public:
    NeuralNetwork() = default;
    NeuralNetwork(const std::string& model);
    void run(const std::string& video);
//    void detect(cv::Mat& image);
    Detection detect(cv::Mat& img);
    void postProcess(cv::Mat& img, Detection &detection, Colors& cl);

private:
    void initModel(const std::string& model);
    PadInfo letterbox(cv::Mat& img, const cv::Size& new_shape, const cv::Scalar& color, bool _auto, bool scaleFill, bool scaleup, int stride);
    void drawPredection(cv::Mat &img, std::vector<cv::Rect> &boxes, std::vector<float> &sc, std::vector<int> &clsIndexs, std::vector<int> &ind, Colors&cl);

private:
    cv::dnn::Net _net;
};
