#include "db_worker.h"

DBWorker::DBWorker(const std::string& dataBaseCredentials)
{
    checkConnection(dataBaseCredentials);
}

void DBWorker::checkConnection(const std::string& dataBaseCredentials)
{
    _connection = pqxx::connection(dataBaseCredentials);

//    if (!_connection->is_open())
//        std::runtime_error("No connection to database");
}
