#pragma once

#include <iostream>
#include <unordered_set>
#include <mutex>

#include <crow.h>
#include <crow/middlewares/cors.h>
#include <crow/websocket.h>
#include <nlohmann/json.hpp>

#include "db_worker.h"

using json = nlohmann::json;

class Server final
{
public:
    Server(const std::string& dbConfig, const int serverPort);
    void run();

private:
    void initDataBase(const std::string& creds);
    void initREST();
    json foo();

private:
    DBWorker _database;
    crow::App<crow::CORSHandler> _app;
    int _port{0};
};
