#include <iostream>
#include <cstdlib>

#include <pqxx/pqxx>

#include "server.h"
#include "config_parser.h"


int main(int argc, char** argv)
{
    try
    {
        if (argc < 3)
        {
            std::clog << "Usage: ./server database.cfg port\n";
            std::exit(EXIT_FAILURE);
        }

        auto credentials = readConfigFile(argv[1]);
        int port = std::atoi(argv[2]);

        Server server(credentials, port);

        server.run();
//        while(true)
//        {
//        }

    }
    catch (const std::exception& e)
    {
        std::cerr << "Server: " << e.what() << "\n";
    }

    return 0;
}


// insert into event (camera_id, description, photo) VALUES(1, '222', decode('013d7d16d7ad4fefb61bd95b765c8ceb', 'hex'));
