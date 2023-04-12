#pragma once

#include <set>
#include <fstream>
#include <sstream>

#include <websocketpp/server.hpp>
#include <websocketpp/config/asio_no_tls.hpp>

using websocketpp::lib::bind;
using websocketpp::lib::placeholders::_1;
using websocketpp::lib::placeholders::_2;
using msg_ptr = websocketpp::server<websocketpp::config::asio>::message_ptr;
using conn_hdl = websocketpp::connection_hdl;
using server = websocketpp::server<websocketpp::config::asio>;
using con_list = std::set<conn_hdl,std::owner_less<conn_hdl>>;

class WebSocketServer final
{
public:
    WebSocketServer(int port);
    void run();

private:
    void init();
    void onOpen(conn_hdl hdl);
    void onClose(conn_hdl hdl);
    void onHttp(conn_hdl hdl);
    void sendData(conn_hdl hdl, msg_ptr msg);

private:
    server _endpoint;
    con_list _clients;
};

//class WebSocketServer : public websocketpp::server<websocketpp::config::asio>
//{
//public:
//    WebSocketServer()
//    {
//        this->set_access_channels(websocketpp::log::alevel::all);
//        this->clear_access_channels(websocketpp::log::alevel::frame_payload);
//        this->init_asio();
//        this->listen(13579);
//        this->set_message_handler(bind(this->onMessage, this, ::_1, ::_2));
//    }

//    void run()
//    {
//        this->start_accept();
//        this->run();
//    }

//    static void onMessage(server* s, websocketpp::connection_hdl hdl, message_ptr msg)
//    {
//        std::cout << "on_message called with hdl: " << hdl.lock().get()
//                  << " and message: " << msg->get_payload()
//                  << std::endl;

//        if (msg->get_payload() == "stop-listening") {
//            s->stop_listening();
//            return;
//        }
//        s->send(hdl, msg->get_payload(), msg->get_opcode());
//    }
//};
