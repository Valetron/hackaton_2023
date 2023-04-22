#include "db_worker.h"

DBWorker::DBWorker(const std::string& dataBaseCredentials)
{
    checkConnection(dataBaseCredentials);
    std::clog << "[Server]: database connected\n";
}

void DBWorker::checkConnection(const std::string& dataBaseCredentials)
{
    _connection = std::make_unique<pqxx::connection>(dataBaseCredentials);

    if (!_connection->is_open())
        throw std::runtime_error("Can't connect to database");

    for (const auto& [name, query] : PREPARED_STATEMENTS)
        _connection->prepare(name, query);

    _notifyListener = std::make_unique<NotificationListener>(*_connection, "add_event");
}

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

pqxx::result DBWorker::getAllCameras()
{
    pqxx::work txn(*_connection);
//    const auto allCameras = txn.exec_prepared("select_all_cameras");
//    txn.commit();
//    return allCameras;
    return txn.exec_prepared("select_all_cameras");
}

void DBWorker::addCamera(const std::string& cameraName, const int procDelay, const std::string& link, const std::string& areas)
{
    pqxx::work txn(*_connection);
    const auto allCameras = txn.exec_prepared("insert_camera", cameraName, procDelay, link, areas);
    txn.commit();
}

//void DBWorker::run()
//{
//    _connection->await_notification();
//    std::clog << _notifyListener->getData() << "\n";
//}

void DBWorker::getEvent()
{
    if (_connection->get_notifs() > 0)
        std::clog << _notifyListener->getData() << "\n";
}

/* ЧатГПТ ответил, не ругайте в ревью. Вероятно, будем использовать get_notifs()
 *
 *
 * get_notifs(): This method retrieves any pending notifications that have been received from PostgreSQL since the last call to get_notifs().
 * Unlike await_notification(), it does not block and wait for incoming notifications.
 * It retrieves all the notifications that are already available in the pqxx::connection object's internal buffer and
 * returns them as a vector of pqxx::notification objects. If no notifications are available, an empty vector is returned.
 * Note that get_notifs() does not wait for new notifications to arrive,
 * so it can be used in a non-blocking manner to periodically check for notifications.
 * In summary, await_notification() is a blocking method that waits for incoming notifications,
 * while get_notifs() is a non-blocking method that retrieves pending notifications from the internal buffer of the pqxx::connection object.
 * The appropriate method to use depends on the specific requirements of your application,
 * such as whether you need to block and wait for notifications or periodically check for notifications without
 * blocking the execution of your program.
 *
 * Example:
 * std::vector<pqxx::notification> notifications = conn.get_notifs();
 * for (const auto& N : notifications)
 * {
 *     foo();
 * }
 *
 *
 * await_notification(): This method blocks and waits for incoming notifications until one is received or until an error occurs.
 * It is a blocking call, meaning that the execution of the program will be paused at this point until a notification is received or
 * an error occurs. Once a notification is received, the method returns a pointer to a pqxx::notification object,
 * which contains information about the notification. If an error occurs, an exception will be thrown.
 *
 * Example:
 * while (true)
 * {
 *   pqxx::notification const* N = conn.await_notification();
 *   if (N)
 *   {
 *      foo();
 *   }
 * }
 */
