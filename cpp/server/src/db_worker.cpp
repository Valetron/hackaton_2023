#include "db_worker.h"

DBWorker::DBWorker(const std::string& dataBaseCredentials)
{
    checkConnection(dataBaseCredentials);
//    initSocket();
}

void DBWorker::checkConnection(const std::string& dataBaseCredentials)
{
    _connection = std::make_unique<pqxx::connection>(dataBaseCredentials);

    if (!_connection->is_open())
        throw std::runtime_error("Can't connect to database");

    for (const auto& [name, query] : PREPARED_STATEMENTS)
        _connection->prepare(name, query);

    _notifyListener = std::make_unique<NotificationListener>(*_connection, "new_notify"); // TODO: поменять название на понятное в скрипте
}
// insert into event (camera_id, description, photo) VALUES(1, '222', decode('013d7d16d7ad4fefb61bd95b765c8ceb', 'hex'));

std::string DBWorker::getData(const std::string& tableName, const int id)
{
    pqxx::work txn(*_connection);
    pqxx::result res;

    if ("camera" == tableName)
        res = txn.exec_prepared("select_camera", id);
    else if ("event" == tableName)
        res = txn.exec_prepared("select_event", id);
    else
        return std::string();

    txn.commit();

    if (res.empty())
        return std::string();

    return pqxx::to_string(res.at(0).at(0));
}

void DBWorker::run()
{
    _connection->await_notification();
    std::clog << _notifyListener->getData() << "\n";
}
