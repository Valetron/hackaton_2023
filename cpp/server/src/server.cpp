#include "server.h"

Server::Server(const std::string& dbConfig, const int serverPort) : _port(serverPort)
{
    initDataBase(dbConfig);
    initREST();
//    initNN();
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

    CROW_ROUTE(_app, "/get/cameras").methods(crow::HTTPMethod::Get)
    ([this]()
    {
        auto cameras = _database.getAllCameras();
        auto camerasJson = crow::json::wvalue::list();

        for (int i = 0; i < cameras.size(); ++i)
        {
            crow::json::wvalue camera;
            camera["id"] = pqxx::from_string<int>(cameras.at(i).at(0));
            camera["name"] = pqxx::to_string(cameras.at(i).at(1));
            camera["processDelay"] = pqxx::from_string<int>(cameras.at(i).at(2));
            camera["link"] = pqxx::to_string(cameras.at(i).at(3));
            camera["areas"] = pqxx::to_string(cameras.at(i).at(4));

            camerasJson.push_back(camera);
        }

        return crow::json::wvalue(camerasJson); // TODO: отослать отсортированные
    });

    CROW_ROUTE(_app, "/post/camera").methods(crow::HTTPMethod::Post)
    ([this](const crow::request& req)
    {
        auto newCamera = crow::json::load(req.body);
        if (!newCamera)
            return crow::response(400);

        std::string cameraName{newCamera["name"]};
        int procDel = newCamera["processDelay"].i();
        std::string stream{newCamera["link"]};
        std::string area{newCamera["areas"]};

        _database.addCamera(cameraName, procDel, stream, area);

        auto cameraId = _database.getNewCameraId();
        if (cameraId < 0)
            return crow::response(418);

        crow::json::wvalue camera({ {"id", cameraId},
                                    {"name", cameraName},
                                    {"processDelay", newCamera},
                                    {"link", stream},
                                    {"areas", area} });

        runModel(stream);

        return crow::response(camera);
    });

    CROW_ROUTE(_app, "/post/modify/camera").methods(crow::HTTPMethod::Post)
    ([this](const crow::request& req)
    {
        auto cameraData = crow::json::load(req.body);
        if (!cameraData)
            return crow::response(400);

        int cameraId = cameraData["id"].i();
        std::string cameraName{cameraData["name"]};
        int procDel = cameraData["processDelay"].i();
        std::string stream{cameraData["link"]};

        _database.modifyCamera(cameraId, cameraName, procDel, stream);

        return crow::response(); // TODO: вернуть обновленную
    });

    CROW_ROUTE(_app, "/post/newArea").methods(crow::HTTPMethod::Post)
    ([this](const crow::request& req)
    {
        auto areaData = crow::json::load(req.body);
        if (!areaData)
            return crow::response(400);

        int idCamera = areaData["id"].i();
        std::string area{areaData["areas"]};

        _database.updateArea(idCamera, area);

        return crow::response();
    });
}

//void Server::initNN()
//{
//    _model = std::make_unique<NeuralNetwork>("./MODEL.onnx");
//    _cl = Colors();
//}

void Server::runModel(const std::string& cameraLink)
{
    auto cap = cv::VideoCapture(cameraLink);
    std::string modelPath = "MODEL.onnx";
    NeuralNetwork _model(modelPath);
    Colors _cl = Colors();

    cv::Mat frame;

    while(cap.isOpened())
    {
        cap >> frame;
        auto detections = _model.detect(frame);

        _model.postProcess(frame, detections, _cl);
    }
}

void Server::run()
{
    _app.port(_port).multithreaded().run();
//    _database.getEvent();

}
