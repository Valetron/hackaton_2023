#include "websocket.h"

WebSocketServer::WebSocketServer(int port)
{
    _endpoint.init_asio();
    _endpoint.listen(port);

    _endpoint.set_open_handler(bind(&WebSocketServer::onOpen, this, _1));
    _endpoint.set_close_handler(bind(&WebSocketServer::onClose, this, _1));
    _endpoint.set_http_handler(bind(&WebSocketServer::onHttp, this, _1));

    std::clog << "ws OK\n";
}

void WebSocketServer::onOpen(conn_hdl hdl)
{
    _clients.insert(hdl);
}

void WebSocketServer::onClose(conn_hdl hdl)
{
    _clients.erase(hdl);
}

void WebSocketServer::onHttp(conn_hdl hdl)
{
    server::connection_ptr con = _endpoint.get_con_from_hdl(hdl);

    std::ifstream file;
    std::string filename = con->get_resource();
    std::string response;

    _endpoint.get_alog().write(websocketpp::log::alevel::app, "http request1: " + filename);

    if (filename == "/")
        filename = "index.html";
    else
        filename = filename.substr(1);


    _endpoint.get_alog().write(websocketpp::log::alevel::app, "http request2: " + filename);

    file.open(filename.c_str(), std::ios::in);
    if (!file)
    {
        std::stringstream ss;

        ss << "<!doctype html><html><head>"
           << "<title>Error 404 (Resource not found)</title><body>"
           << "<h1>Error 404</h1>"
           << "<p>The requested URL " << filename << " was not found on this server.</p>"
           << "</body></head></html>";

        con->set_body(ss.str());
        con->set_status(websocketpp::http::status_code::not_found);
        return;
    }

    file.seekg(0, std::ios::end);
    response.reserve(file.tellg());
    file.seekg(0, std::ios::beg);

    response.assign((std::istreambuf_iterator<char>(file)), std::istreambuf_iterator<char>());

    con->set_body(response);
    con->set_status(websocketpp::http::status_code::ok);
}

void WebSocketServer::run()
{
    std::stringstream ss;

    _endpoint.get_alog().write(websocketpp::log::alevel::app, ss.str());
    _endpoint.start_accept();

    _endpoint.set_message_handler(bind(&WebSocketServer::sendData, this, _1, _2));
    _endpoint.run();
}

void WebSocketServer::sendData(conn_hdl hdl, msg_ptr msg)
{
    std::clog << "on_message called with hdl: " << hdl.lock().get()
              << " and message: " << msg->get_payload() << "\n";

    _endpoint.send(hdl, msg->get_payload(), msg->get_opcode());

}
