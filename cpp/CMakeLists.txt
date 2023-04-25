cmake_minimum_required(VERSION 3.10)
project(hackaton LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_MODULE_PATH "${CMAKE_MODULE_PATH};${CMAKE_CURRENT_SOURCE_DIR}/cmake")
set(ROOT_DIR "${CMAKE_CURRENT_SOURCE_DIR}")

find_program(CCACHE_PROGRAM ccache)
if(CCACHE_PROGRAM)
    set_property(GLOBAL PROPERTY RULE_LAUNCH_COMPILE ${CCACHE_PROGRAM})
endif()

add_subdirectory(server/)
add_subdirectory(neural_network/)
add_subdirectory(utils/)

# NOTE: возможно, убрать
if(CMAKE_BUILD_TYPE STREQUAL "Release")
    add_compile_options(-Os -pipe)
endif()
