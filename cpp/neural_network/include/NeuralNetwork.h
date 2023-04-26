#pragma once

#include <string>

#include <opencv2/core.hpp>
#include <opencv2/videoio.hpp>
#include <opencv2/highgui.hpp>

class NeuralNetwork final
{
public:
    NeuralNetwork() = default;
    void run(const std::string& video);
};
