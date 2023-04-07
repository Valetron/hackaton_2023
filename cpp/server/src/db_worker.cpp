#include "db_worker.h"

DBWorker::DBWorker(const std::string& dataBaseCredentials)
{
    checkConnection(dataBaseCredentials);
}

void DBWorker::checkConnection(const std::string& dataBaseCredentials)
{
    _connection = pqxx::connection(dataBaseCredentials);

    if (!_connection.is_open())
        throw std::runtime_error("Can't connect to database");

    for (const auto& [name, query] : PREPARED_STATEMENTS)
        _connection.prepare(name, query);

}
