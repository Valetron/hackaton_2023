#include <iostream>

#include "NeuralNetwork.h"

int main(int argc, char** argv)
{
    NeuralNetwork nn(argv[1]);

//    nn.run(argv[1]);
    auto img = cv::imread(argv[2]);
    nn.detect(img);

    return 0;
}
