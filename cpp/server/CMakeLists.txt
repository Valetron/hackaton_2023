cmake_minimum_required(VERSION 3.13)
project(server LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_INCLUDE_CURRENT_DIR ON)

include_directories(${PROJECT_SOURCE_DIR}/include)
include_directories(${ROOT_DIR}/utils)
include_directories(${ROOT_DIR}/neural_network/include)

find_package(PostgreSQL REQUIRED)
find_package(libpqxx REQUIRED)
find_package(Crow REQUIRED)
find_package(nlohmann_json REQUIRED)

if(ENV{OpenCV_DIR})
    set(OpenCV_DIR ${OpenCV_DIR})
else()
    find_package(OpenCV REQUIRED)
endif()

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
                      Crow::Crow
                      PostgreSQL::PostgreSQL
                      libpqxx::libpqxx
                      nlohmann_json::nlohmann_json
                      ${OpenCV_LIBS})
