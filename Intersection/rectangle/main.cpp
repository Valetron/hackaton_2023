#include <vector>

struct Point {
    double x;
    double y;

    Point(double x = 0.0, double y = 0.0) : x(x), y(y) {}
};

class Rectangle {
public:
    std::vector<Point> vertices;
    Rectangle(const std::vector<Point>& points){
        if (points.size()==4){
            for (Point vertex : points){
                vertices.push_back(vertex);
            }
        }
        else{
            throw ("rectangle must contained only 4 points");
        }
    }
};

bool isIntersect(const Rectangle& rect1, const Rectangle& rect2) {
    // Check intersection on each pair of sides
    for(int i=0; i<4; i++) {
        Point p1 = rect1.vertices[i];
        Point p2 = rect1.vertices[(i+1)%4];
        for(int j=0; j<4; j++) {
            Point p3 = rect2.vertices[j];
            Point p4 = rect2.vertices[(j+1)%4];
            double d1 = (p2.x-p1.x)*(p3.y-p1.y) - (p2.y-p1.y)*(p3.x-p1.x);
            double d2 = (p2.x-p1.x)*(p4.y-p1.y) - (p2.y-p1.y)*(p4.x-p1.x);
            double d3 = (p4.x-p3.x)*(p1.y-p3.y) - (p4.y-p3.y)*(p1.x-p3.x);
            double d4 = (p4.x-p3.x)*(p2.y-p3.y) - (p4.y-p3.y)*(p2.x-p3.x);
            if((d1>0 && d2<0 || d1<0 && d2>0) && (d3>0 && d4<0 || d3<0 && d4>0)) {
                return true; // Rectangles are intersecting
            }
        }
    }
    return false; // Rectangles are NOT intersecting
}

bool isInside(const Rectangle& rect1, const Rectangle& rect2) {
    // Check if all vertices of rect1 are in rect2
    for (int i = 0; i < 4; i++) {
        Point p = rect1.vertices[i];
        if (p.x < rect2.vertices[0].x || p.x > rect2.vertices[2].x || p.y < rect2.vertices[0].y ||
            p.y > rect2.vertices[2].y) {
            return false;
        }
    }
    return true;
}

void sendIntersectionResult(const Rectangle& r1, const Rectangle& r2){
    // If all we are intersecting rectangle or we are in one of them, then throw violation
    bool result = (isInside(r1, r2) || isInside(r2, r1) ||isIntersect(r1, r2));
}

void getPoints(std::vector<Point>& points1, std::vector<Point>& points2){
    //Valera, kak prinimat' eti ebuchie tochki?! Of fucking rectangles?
}

int main() {
    std::vector<Point> points1, points2;
    getPoints(points1, points2);

    Rectangle r1(points1);
    Rectangle r2(points2);

    sendIntersectionResult(r1, r2);

    return 0;
}
