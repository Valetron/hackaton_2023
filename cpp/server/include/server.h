#pragma once

#include <iostream>
#include <unordered_set>
#include <mutex>

#include <crow.h>
#include <crow/middlewares/cors.h>
#include <crow/websocket.h>
#include <nlohmann/json.hpp>

#include "db_worker.h"
#include "NeuralNetwork.h"

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
    void initNN();
    void runModel(const std::string& cameraLink);

private:
    DBWorker _database;
    crow::App<crow::CORSHandler> _app;
    int _port{0};
//    std::unique_ptr<NeuralNetwork> _model;
//    Colors _cl;

};
