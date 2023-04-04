#include <iostream>
#include <vector>

struct Point {
    double x;
    double y;

    Point(double x = 0.0, double y = 0.0) : x(x), y(y) {}
};

class Rectangle {
public:
    std::vector<Point> vertices;

    //start means the top-left point
    Rectangle(Point &start, const double width, const double height) {
        vertices.emplace_back(start);
        start.x += width;
        vertices.emplace_back(start);
        start.y -= height;
        vertices.emplace_back(start);
        start.x -= width;
        vertices.emplace_back(start);
    }
};

bool isIntersect(const Rectangle &rect1, const Rectangle &rect2) {
    // Check intersection on each pair of sides
    for (int i = 0; i < 4; ++i) {
        Point p1 = std::move(rect1.vertices[i]);
        Point p2 = std::move(rect1.vertices[(i + 1) % 4]);
        for (int j = 0; j < 4; ++j) {
            Point p3 = std::move(rect2.vertices[j]);
            Point p4 = std::move(rect2.vertices[(j + 1) % 4]);
            double d1 = (p2.x - p1.x) * (p3.y - p1.y) - (p2.y - p1.y) * (p3.x - p1.x);
            double d2 = (p2.x - p1.x) * (p4.y - p1.y) - (p2.y - p1.y) * (p4.x - p1.x);
            double d3 = (p4.x - p3.x) * (p1.y - p3.y) - (p4.y - p3.y) * (p1.x - p3.x);
            double d4 = (p4.x - p3.x) * (p2.y - p3.y) - (p4.y - p3.y) * (p2.x - p3.x);
            if ((d1 >= 0 && d2 <= 0 || d1 <= 0 && d2 >= 0) && (d3 >= 0 && d4 <= 0 || d3 <= 0 && d4 >= 0)) {
                return true; // Rectangles are intersecting
            }
        }
    }
    return false; // Rectangles are NOT intersecting
}

bool isInside(const Rectangle &rect1, const Rectangle &rect2) {
    // Check if all vertices of rect1 are in rect2
    for (int i = 0; i < 4; ++i) {
        if (rect1.vertices[i].x <= rect2.vertices[0].x ||
            rect1.vertices[i].x >= rect2.vertices[2].x ||
            rect1.vertices[i].y <= rect2.vertices[0].y ||
            rect1.vertices[i].y >= rect2.vertices[2].y) {
            return false;
        }
    }
    return true;
}

bool sendIntersectionResult(const Rectangle &r1, const Rectangle &r2) {
    // If all we are intersecting rectangle or we are in one of them, then throw violation
    return (isInside(r1, r2) || isInside(r2, r1) || isIntersect(r1, r2));
}

int main() {
    //examples:
    //r1==r2 - true
    Point p1(5.0, 5.0);
    Point p2(5.0, 5.0);

//    //r1 doesn't intersect r2, but r2 in r1
//        Point p1 (0.0, 1.0);
//        Point p2 (0.2, 0.9);

//    //r1 intersects r2
//        Point p1 (0.0, 1.0);
//        Point p2 (0.2, 1.1);

//    //r1 and r2 don't touch each other or in
//    Point p1 (0.0, 5.0);
//    Point p2 (5.0, 5.0);
    double width1 = 1.0, height1 = 1.0, width2 = 1.0, height2 = 1.0;
    Rectangle r1(p1, width1, height1);
    Rectangle r2(p2, width2, height2);

    std::cout << sendIntersectionResult(r1, r2) << '\n';

    return 0;
}
