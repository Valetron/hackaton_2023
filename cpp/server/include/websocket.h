#pragma once

#include <set>
#include <fstream>
#include <sstream>

#include <crow.h>

//#include <websocketpp/server.hpp>
//#include <websocketpp/config/asio_no_tls.hpp>

//using websocketpp::lib::bind;
//using websocketpp::lib::placeholders::_1;
//using websocketpp::lib::placeholders::_2;
//using msg_ptr = websocketpp::server<websocketpp::config::asio>::message_ptr;
//using conn_hdl = websocketpp::connection_hdl;
//using server = websocketpp::server<websocketpp::config::asio>;
//using con_list = std::set<conn_hdl,std::owner_less<conn_hdl>>;

class WebSocketServer final
{
public:
    WebSocketServer(int port);
    void run();

private:
    void init();
//    void onOpen(conn_hdl hdl);
//    void onClose(conn_hdl hdl);
//    void onHttp(conn_hdl hdl);
//    void sendData(conn_hdl hdl, msg_ptr msg);

private:
    crow::SimpleApp _app;
//    server _endpoint;
//    con_list _clients;
};
