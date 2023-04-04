#include <iostream>

//#include "db_worker.h"
#include "config_parser.h"

int main(int argc, char** argv)
{
    try
    {
        std::clog << readConfigFile(argv[1]) << "\n";
// TODO: connect to db
    }
    catch (const std::exception& e)
    {
        std::cerr << "Server: " << e.what() << "\n";
    }

    return 0;
}
