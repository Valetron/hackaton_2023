cmake_minimum_required(VERSION 3.13)
project(neural_network LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_INCLUDE_CURRENT_DIR ON)

include_directories(${PROJECT_SOURCE_DIR}/include)
include_directories(${ROOT_DIR}/utils)

if(ENV{OpenCV_DIR})
    set(OpenCV_DIR ${OpenCV_DIR})
else()
    find_package(OpenCV REQUIRED)
endif()

#file(GLOB SOURCES "src/*.cpp")
#file(GLOB HEADERS "include/*.h")

add_executable(${PROJECT_NAME}
#               ${HEADERS}
#               ${SOURCES}
               main.cpp)

#add_library(${PROJECT_NAME}
#            SHARED
#            ${HEADERS}
#            ${SOURCES}
#            main.cpp)

if (USE_CUDA)
    add_compile_definitions(CUDA_SUPPORT)
endif()

target_include_directories(${PROJECT_NAME}
                           PUBLIC)

target_link_libraries(${PROJECT_NAME}
                      PRIVATE
                      ${OpenCV_LIBS})
