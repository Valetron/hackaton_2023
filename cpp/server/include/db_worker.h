#pragma once

#include <iostream>
#include <map>
#include <string>

#include <pqxx/pqxx>

namespace
{
static const std::map<std::string, std::string> PREPARED_STATEMENTS
{
        {"select_camera", "select * from camera where id = $1"},
        {"select_event", "select * from event where id = $1"},
        {"insert_camera", "insert into camera (name, processing_period, stream, areas)"
                          "VALUES ($1, $2, $3, $4)"},
        {"insert_event", "insert into event (camera_id, description, time_stamp, photo)"
                         "VALUES ($1, $2, $3, $4)"},
};
}

class DBWorker final
{
public:
    DBWorker(const std::string& dataBaseCredentials);
    std::string getData(const std::string& tableName, const int id);
    void setData(const std::string& tableName, const std::string& rawData);

private:
    void checkConnection(const std::string& dataBaseCredentials);

private:
    std::unique_ptr<pqxx::connection> _connection;
};
