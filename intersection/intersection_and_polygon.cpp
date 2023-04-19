#include <iostream>
#include <cmath>
#include <vector>
#include <algorithm>

const double alarm_value = 0.45;

struct Point {
    double x, y;

    explicit Point() = default;

    Point(double xx, double yy) : x{xx}, y{yy} {}
};

struct Segment {
    Point p1{}, p2{};

    explicit Segment(Point p1, Point p2) {
        this->p1 = p1;
        this->p2 = p2;
    }
};

struct Polygon {
    std::vector<Segment> sides;

    explicit Polygon(std::vector<Segment> &sides) {
        for (Segment seg: sides) {
            this->sides.emplace_back(seg);
        }
    }
};

bool rayIntersectsSegment(Point pt, Segment seg) {
    Point a{}, b{};
    if (seg.p1.y < seg.p2.y) {
        a = seg.p1;
        b = seg.p2;
    } else {
        a = seg.p2;
        b = seg.p1;
    }
    while (pt.y == a.y || pt.y == b.y) {
        pt.y = std::nextafter(pt.y, std::numeric_limits<double>::infinity());
    }
    if (pt.y < a.y || pt.y > b.y) {
        return false;
    }
    if (a.x > b.x) {
        if (pt.x > a.x) {
            return false;
        }
        if (pt.x < b.x) {
            return true;
        }
    } else {
        if (pt.x > b.x) {
            return false;
        }
        if (pt.x < a.x) {
            return true;
        }
    }
    return (pt.y - a.y) / (pt.x - a.x) >= (b.y - a.y) / (b.x - a.x);
}

bool is_point_inside_polygon(Point &pt, Polygon &pg) {
    bool is_odd = false;
    for (auto side: pg.sides) {
        if (rayIntersectsSegment(pt, side)) {
            is_odd = !is_odd;
        }
    }
    return is_odd;
}

bool get_line_intersection(Segment &seg1,
                           Segment &seg2, Point &p) {
    double s1_x, s1_y, s2_x, s2_y;
    s1_x = seg1.p2.x - seg1.p1.x;
    s1_y = seg1.p2.y - seg1.p1.y;
    s2_x = seg2.p2.x - seg2.p1.x;
    s2_y = seg2.p2.y - seg2.p1.y;

    double s, t;
    s = (-s1_y * (seg1.p1.x - seg2.p1.x) + s1_x * (seg1.p1.y - seg2.p1.y)) / (-s2_x * s1_y + s1_x * s2_y);
    t = (s2_x * (seg1.p1.y - seg2.p1.y) - s2_y * (seg1.p1.x - seg2.p1.x)) / (-s2_x * s1_y + s1_x * s2_y);

    if (s >= 0 && s <= 1 && t >= 0 && t <= 1) {
        // Collision detected
        p.x = seg1.p1.x + (t * s1_x);
        p.y = seg1.p1.y + (t * s1_y);
        return true;
    }

    return false; // No collision
}

double rectangle_area(Polygon &poly) {
    return (sqrt(pow(poly.sides[0].p1.x - poly.sides[0].p2.x, 2) + pow(poly.sides[0].p1.y - poly.sides[0].p2.y, 2)) *
            sqrt(pow(poly.sides[1].p1.x - poly.sides[1].p2.x, 2) + pow(poly.sides[1].p1.y - poly.sides[1].p2.y, 2)));
}

double polygon_area(std::vector<Point> &points) {
    double area = 0.0;

    int j = points.size() - 1;
    for (int i = 0; i < points.size(); ++i) {
        area += (points[j].x + points[i].x) * (points[j].y - points[i].y);
        j = i;  // j is previous vertex to i
    }

    return std::abs(area / 2.0);
}

void sort_vertices(std::vector<Point> &intersect_f_p) {
    const auto [x_min, x_max] = std::minmax_element(intersect_f_p.begin(), intersect_f_p.end(),
                                                    [](const auto &a, const auto &b) { return a.x < b.x; });
    const auto [y_min, y_max] = std::minmax_element(intersect_f_p.begin(), intersect_f_p.end(),
                                                    [](const auto &a, const auto &b) { return a.y < b.y; });

    Point left_bottom_p(x_min->x, y_min->y), right_top_p(x_max->x, y_max->y);
    Point c(right_top_p.x - (right_top_p.x - left_bottom_p.x) / 2,
            right_top_p.y - (right_top_p.y - left_bottom_p.y) / 2);

    std::sort(intersect_f_p.begin(), intersect_f_p.end(), [&c](const auto &a, const auto &b) {
        auto av = std::atan2(a.y - c.y, a.x - c.x);
        auto bv = std::atan2(b.y - c.y, b.x - c.x);

        if (std::abs(av - bv) < std::numeric_limits<double>::epsilon()) {
            double lena = std::sqrt((a.x - c.x, 2) * (a.x - c.x, 2) + (a.y - c.y, 2) * (a.y - c.y, 2));
            double lenb = std::sqrt((b.x - c.x, 2) * (b.x - c.x, 2) + (b.y - c.y, 2) * (b.y - c.y, 2));
            return lena < lenb;
        }
        return av < bv;
    });
}

bool is_worker_in_zone(Polygon &zone, Polygon &entity_in_zone) {
    std::vector<Point> intersect_f_p;
    Point figure_point{};
    for (auto entity_seg: entity_in_zone.sides) {
        //add rectangle points inside the zone
        if (is_point_inside_polygon(entity_seg.p1, zone)) {
            intersect_f_p.emplace_back(entity_seg.p1);
        }
        for (auto zone_seg: zone.sides) {
            //add intersection points
            if (get_line_intersection(entity_seg, zone_seg, figure_point)) {
                intersect_f_p.emplace_back(figure_point);
            }
        }
    }
    bool is_entity_outside = true;
    //add zone points inside a rectangle
    for (auto zone_seg: zone.sides) {
        if (is_point_inside_polygon(zone_seg.p1, entity_in_zone)) {
            intersect_f_p.emplace_back(zone_seg.p1);
            is_entity_outside = false;
        }
    }
    if (intersect_f_p.empty()) {
        if (is_entity_outside){
            return false;
        }
        return true;
    }

    sort_vertices(intersect_f_p);

    double entity_in_zone_area = rectangle_area(entity_in_zone);
    double intersect_area = polygon_area(intersect_f_p);

    return (intersect_area / entity_in_zone_area) > alarm_value;
}

int main() {
    ///
//    double x1, y1, x2, y2, x3, y3, x4, y4;
//    std::cout << "seg1: ";
//    std::cin >> x1 >> y1 >> x2 >> y2;
//    std::cout << "\nseg2: ";
//    std::cin >> x3 >> y3 >> x4 >> y4;
//
//    Point a1 = {x1, y1}, a2 = {x2, y2};
//    Point b1 = {x3, y3}, b2 = {x4, y4};
//
//    Point p1;
//    Segment s1(a1, a2);
//    Segment s2(b1, b2);
//
//    Point res;
//    if (get_line_intersection(s1, s2, res))
//        std::cout << "Intersection point" << res.x << " " << res.y;
//        //((x_3 - x_1) / (x_2 - x_1) == (y_3 - y_1) / (y_2 - y_1))
//    else if ((b1.x - a1.x) / (a2.x - a1.x) == (b1.y - a1.y) / (a2.y - a1.y)) {
//        std::cout << "Segments in each other\n";
//    } else {
//        std::cout << "Segments are NOT intersect\n";
//    }

    //zone example
    std::vector<Segment> segs_zone;
    segs_zone.emplace_back(Point(5,27), Point(2,13));
    segs_zone.emplace_back(Point(2,13), Point(13, 1));
    segs_zone.emplace_back(Point(13, 1), Point(41, 2));
    segs_zone.emplace_back(Point(41, 2), Point(53, 16));
    segs_zone.emplace_back(Point(53, 16), Point(24, 13));
    segs_zone.emplace_back(Point(24, 13), Point(15,28));
    segs_zone.emplace_back(Point(15,28), Point(5,27));
    Polygon zone(segs_zone);

    //test for is_point_inside_polygon
//    Point point(6.0, 3.0);
//    if (is_point_inside_polygon(point, zone))
//        std::cout << "Point in polygon\n";
//    else
//        std::cout << "Point is NOT in polygon\n";

    //worker example Den
    std::vector<Segment> segs_worker;
    segs_worker.emplace_back(Point(35, 10), Point(40, 10));
    segs_worker.emplace_back(Point(40, 10), Point(40, 20));
    segs_worker.emplace_back(Point(40, 20), Point(35, 20));
    segs_worker.emplace_back(Point(35, 20), Point(35, 10));
    Polygon worker(segs_worker);
    if (is_worker_in_zone(zone, worker))
        std::cout << "Entity on place\n";
    else
        std::cout << "Entity is NOT on place\n";

    //next worker example (uncomment this and comment next)
//    std::vector<Segment> segs_worker;
//    segs_worker.emplace_back(Point(4, 4), Point(6, 4));
//    segs_worker.emplace_back(Point(6, 4), Point(6, -6));
//    segs_worker.emplace_back(Point(6, -6), Point(4, -6));
//    segs_worker.emplace_back(Point(4, -6), Point(4, 4));
//    Polygon worker(segs_worker);
//    if (is_worker_in_zone(zone, worker))
//        std::cout << "Entity on place\n";
//    else
//        std::cout << "Entity is NOT on place\n";
    return 0;
}