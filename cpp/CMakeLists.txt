cmake_minimum_required(VERSION 3.10)
project(hackaton LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_MODULE_PATH "${CMAKE_MODULE_PATH};${CMAKE_CURRENT_SOURCE_DIR}/cmake")
set(ROOT_DIR "${CMAKE_CURRENT_SOURCE_DIR}")

find_program(CCACHE_PROGRAM ccache)
if(CCACHE_PROGRAM)
    set_property(GLOBAL PROPERTY RULE_LAUNCH_COMPILE ${CCACHE_PROGRAM})
endif()

#find_package(libpqxx)
#include(${CMAKE_MODULE_PATH}/Findlibpqxx.cmake)
#include(cmake/Findlibpqxx.cmake)
#find_package(nlohmann_json)
#find_package(OpenCV 4.5.2)

add_subdirectory(server/)
add_subdirectory(neural_network/)
add_subdirectory(utils/)

if (CMAKE_BUILD_TYPE STREQUAL "Debug")
    set(CMAKE_VERBOSE_MAKEFILE on)
    message(STATUS "Libpqxx headers - ${libpqxx_INCLUDE_DIR}")
    message(STATUS "Libpqxx library - libpqxx::libpqxx  ")
    message(STATUS "OpenCV headers - ${opencv_INCLUDE_DIRS}")
    message(STATUS "OpenCV library - ${opencv_LIBS}")
    message(STATUS "JSON headers - ${nlohmann_json_INCLUDE_DIRS}")
    message(STATUS "JSON library - ${nlohmann_json_LIBS}")

    message(STATUS "C++ compiler options: ${CMAKE_CXX_FLAGS}")
endif()

# NOTE: возможно, убрать
if(CMAKE_BUILD_TYPE STREQUAL "Release")
    add_compile_options(-Os -pipe)
endif()
