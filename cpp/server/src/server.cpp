#include "server.h"

Server::Server(const std::string& dbConfig, const int serverPort) : _port(serverPort)
{
    initDataBase(dbConfig);
//    initWebsocket();
    initREST();
}

void Server::initDataBase(const std::string& creds)
{
    _database = DBWorker(creds);
}

void Server::initREST()
{
    auto& cors = _app.get_middleware<crow::CORSHandler>();
    cors.global()
        .methods(crow::HTTPMethod::Post, crow::HTTPMethod::Get)
        .prefix("/cors")
        .origin("127.0.0.1");

    //    CROW_ROUTE(_app, "/")
    //    ([]()
    //    {
    //        return "Hello";
    //    });


    CROW_ROUTE(_app, "/get/cameras").methods(crow::HTTPMethod::Get)
    ([this]()
    {
        auto cameras = _database.getAllCameras();
        auto camerasJson = crow::json::wvalue::list();

        for (int i = 0; i < cameras.size(); ++i)
        {
            //            json camera = { { "name", cameras.at(i).at(1) },
            //                            { "processing_period", cameras.at(i).at(2) },
            //                            { "stream", cameras.at(i).at(3) },
            //                            { "areas", cameras.at(i).at(4) } };

            crow::json::wvalue camera;
            camera["name"] = pqxx::to_string(cameras.at(i).at(1));
            camera["processing_period"] = pqxx::from_string<int>(cameras.at(i).at(2));
            camera["stream"] = pqxx::to_string(cameras.at(i).at(3));
            camera["areas"] = pqxx::to_string(cameras.at(i).at(4));

            camerasJson.emplace_back(camera);
        }
//        return camerasJson;

//        return crow::json::wvalue(f);

        return crow::json::wvalue(camerasJson);
    });

    CROW_ROUTE(_app, "/post/camera").methods(crow::HTTPMethod::Post)
    ([](const crow::request& req)
    {
        auto newCamera = crow::json::load(req.body);
        if (!newCamera) return crow::response(400);

        std::clog << "ЙА ПАЛУЧИЛ- " << newCamera["name"] << "\n";

        return crow::response(); // вернуть всё + id камеры
    });

    CROW_ROUTE(_app, "/post/modify/camera").methods(crow::HTTPMethod::Post)
    ([](const crow::request& req)
    {
        auto cameraData = crow::json::load(req.body);
        if (!cameraData) return crow::response(400);

        std::clog << "MODIFY - " << cameraData << "\n";

        return crow::response();
    });
}

void Server::run()
{
    _app.port(_port).multithreaded().run();
//    _database.getEvent();

}
