#include <iostream>

#include "NeuralNetwork.h"

int main(int argc, char** argv)
{
    NeuralNetwork nn;

    nn.run(argv[1]);

    return 0;
}
