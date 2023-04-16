#include "server.h"

Server::Server(const std::string& dbConfig, const int serverPort)
{
    initDataBase(dbConfig);
    initWebsocket(serverPort);
}

void Server::initDataBase(const std::string& creds)
{
    _database = DBWorker(creds);
}

void Server::initWebsocket(const int wsPort)
{
    _ws = std::make_unique<WebSocketServer>(wsPort);
    _ws->run();
}

void Server::run()
{
    _database.getEvent();
//    _ws->
}
