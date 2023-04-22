#pragma once

#include <crow.h>
#include <crow/middlewares/cors.h>
#include <nlohmann/json.hpp>

#include "db_worker.h"
//#include "websocket.h"

//struct Camera
//{
//    Camera(const int procDel, const std::string& name, const std::string& link)
//          : _processDelay(procDel), _name(name), _link(link)
//    {}
//    int _processDelay;
//    std::string _name;
//    std::string _link;
//};

using json = nlohmann::json;

class Server final
{
public:
    Server(const std::string& dbConfig, const int serverPort);
    void run();

private:
    void initDataBase(const std::string& creds);
    void initREST();
    void initWebsocket();
    json foo();

private:
    DBWorker _database;
//    std::unique_ptr<WebSocketServer> _ws;
    crow::App<crow::CORSHandler> _app;
    int _port{0};
};
