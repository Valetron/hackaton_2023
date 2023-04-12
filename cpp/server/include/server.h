#pragma once

#include "db_worker.h"
#include "websocket.h"

class Server final
{
public:
    Server(const std::string& dbConfig, const int serverPort);
    void run();

private:
    void initDataBase(const std::string& creds);
    void initWebsocket(const int wsPort);

private:
    DBWorker                         _database;
    std::unique_ptr<WebSocketServer> _ws;
};
