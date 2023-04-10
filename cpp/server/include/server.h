#pragma once

#include "db_worker.h"

class Server final
{
public:
    Server(const std::string& dbConfig, const int& serverPort);
    void run();

private:
    void initDataBase(const std::string& creds);
    void initWebsocket();

private:
    DBWorker _database;

};
