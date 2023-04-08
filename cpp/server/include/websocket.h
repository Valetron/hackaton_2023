#pragma once

#include <websocketpp/server.hpp>
#include <websocketpp/config/asio_no_tls.hpp>

using websocketpp::lib::bind;
using websocketpp::lib::placeholders::_1;
using websocketpp::lib::placeholders::_2;
typedef websocketpp::server<websocketpp::config::asio>::message_ptr message_ptr;

class WebSocketServer : public websocketpp::server<websocketpp::config::asio>
{
public:
    WebSocketServer()
    {
        this->set_access_channels(websocketpp::log::alevel::all);
        this->clear_access_channels(websocketpp::log::alevel::frame_payload);
        this->init_asio();
        this->listen(13579);
        this->set_message_handler(bind(this->onMessage, this, ::_1, ::_2));
    }

    void run()
    {
        this->start_accept();
        this->run();
    }

    static void onMessage(server* s, websocketpp::connection_hdl hdl, message_ptr msg)
    {
        std::cout << "on_message called with hdl: " << hdl.lock().get()
                  << " and message: " << msg->get_payload()
                  << std::endl;

        // check for a special command to instruct the server to stop listening so
        // it can be cleanly exited.
        if (msg->get_payload() == "stop-listening") {
            s->stop_listening();
            return;
        }
        s->send(hdl, msg->get_payload(), msg->get_opcode());
    }
};
