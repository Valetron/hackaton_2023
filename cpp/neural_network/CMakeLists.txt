cmake_minimum_required(VERSION 3.13)
project(nn LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_INCLUDE_CURRENT_DIR ON)

include_directories(${PROJECT_SOURCE_DIR}/include)
include_directories(${ROOT_DIR}/utils)

#if (not ${})
find_package(opencv REQUIRED)

file(GLOB SOURCES "src/*.cpp")
file(GLOB HEADERS "include/*.h")

add_executable(${PROJECT_NAME}
               ${HEADERS}
               ${SOURCES}
               main.cpp)

#add_library(${PROJECT_NAME}
#            SHARED
#            ${HEADERS}
#            ${SOURCES}
#            main.cpp)

target_include_directories(${PROJECT_NAME}
                           PUBLIC
                           )

target_link_libraries(${PROJECT_NAME}
                      PUBLIC
                      )
