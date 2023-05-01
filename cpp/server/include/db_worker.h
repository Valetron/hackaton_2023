#pragma once

#include <iostream>
#include <map>
#include <string>

#include <pqxx/pqxx>

namespace
{
static const std::map<std::string, std::string> PREPARED_STATEMENTS
{
    {"select_all_cameras", "select * from camera"},
    {"select_camera",      "select * from camera where id = $1"},
    {"select_event",       "select * from event where id = $1"},
    {"insert_camera",      "insert into camera (name, processDelay, link, areas)"
                           "VALUES ($1, $2, $3, $4)"},
    {"insert_event",       "insert into event (camera_id, description, time_stamp, photo)"
                           "VALUES ($1, $2, $3, $4)"},
    {"update_area",        "update camera set areas = $2 where id = $1"},
    {"update_camera",      "update camera set name = $2, link = $3, processDelay = $4 where id = $1"},
};
}

class NotificationListener : public pqxx::notification_receiver
{
public:
    NotificationListener(pqxx::connection_base& connection, const std::string& channel)
                        : pqxx::notification_receiver(connection, channel)
    {
    }

    void operator()(const std::string& payload, int pid) override
    {
        _data = payload;
    }

    const std::string& getData()
    {
        return _data;
    }

private:
    std::string _data{""};
};

class DBWorker final
{
public:
    DBWorker() = default;
    DBWorker(const std::string& dataBaseCredentials);
    int getNewCameraId();
    void getEvent();
    void addCamera(const std::string& cameraName, const int procDelay, const std::string& link, const std::string& areas);
    void modifyCamera(const int id, const std::string& cameraName, const int procDelay, const std::string& link);
    void updateArea(const int id, const std::string& area);
    pqxx::result getAllCameras();


private:
    void checkConnection(const std::string& dataBaseCredentials);

private:
    std::unique_ptr<pqxx::connection> _connection;
    std::unique_ptr<NotificationListener> _notifyEvent;
    std::unique_ptr<NotificationListener> _notifyCamera;
};
