cmake_minimum_required(VERSION 3.13)
project(server LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_INCLUDE_CURRENT_DIR ON)

include_directories(${PROJECT_SOURCE_DIR}/include)
include_directories(${ROOT_DIR}/utils)

find_package(PostgreSQL REQUIRED)
find_package(libpqxx REQUIRED)
find_package(websocketpp REQUIRED)

file(GLOB SOURCES "src/*.cpp")
file(GLOB HEADERS "include/*.h")

add_executable(${PROJECT_NAME}
               ${HEADERS}
               ${SOURCES}
               main.cpp)

target_include_directories(${PROJECT_NAME}
                           PUBLIC
                           ${libpqxx_INCLUDE_DIR})

target_link_libraries(${PROJECT_NAME}
                      PUBLIC
                      websocketpp::websocketpp
                      PostgreSQL::PostgreSQL
                      libpqxx::libpqxx)
