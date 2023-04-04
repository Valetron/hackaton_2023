#include <iostream>
#include <filesystem>
#include <string>
#include <regex>
#include <fstream>
#include <array>

namespace fs = std::filesystem;
namespace
{
const int ROWS_COUNT = 5;
}

std::string readConfigFile(const std::string& configPath)
{
    if (!fs::is_regular_file(configPath))
        throw std::invalid_argument("Not a regular file");

    std::ifstream configFile(configPath);
    if (!configFile.is_open())
        throw std::runtime_error("Can't open file");

    auto data = std::array<std::string, ROWS_COUNT>();
    for (int i = 0; i < ROWS_COUNT; ++i)
    {
        std::getline(configFile, data[i]);
        data[i] = data[i].substr(data[i].find('=') + 1);
    }

    return std::string("user=" + data[0] +
                       " password=" + data[1] +
                       " host=" + data[2] +
                       " dbname=" + data[3] +
                       " port=" + data[4]);
}
