#include <iostream>

#include "db_worker.h"
#include "config_parser.h"

int main(int argc, char** argv)
{
    try
    {
        auto credentials = readConfigFile(argv[1]);
        auto database = DBWorker(credentials);
    }
    catch (const std::exception& e)
    {
        std::cerr << "Server: " << e.what() << "\n";
    }

    return 0;
}
