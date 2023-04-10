#include "server.h"

Server::Server(const std::string& dbConfig, const int& serverPort)
{
    initDataBase(dbConfig);
}

void Server::initDataBase(const std::string& creds)
{
    _database = DBWorker(creds);
}

void Server::initWebsocket()
{

}

void Server::run()
{
    _database.getEvent();
}
