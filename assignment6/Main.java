package assignment6;

public class Main {
    private static final double THRESHOLD = 0.000001;
    public static boolean findIntersectionPoint(double x0, double y0, double
            r0, double x1, double y1, double r1, double x2, double y2, double r2)
    {
        double a, delX, delY, d, h, rx, ry;
        double p2X, p2Y;
        delX = x1 - x0;
        delY = y1 - y0;
        d = Math.sqrt((delY*delY) + (delX*delX));
        if (d > (r0 + r1))
        {
            return false;
        }
        if (d < Math.abs(r0 - r1))
        {
            return false;
        }
        a = ((r0*r0) - (r1*r1) + (d*d)) / (2.0 * d) ;
        p2X = x0 + (delX * a/d);
        p2Y = y0 + (delY * a/d);
        h = Math.sqrt((r0*r0) - (a*a));
        rx = -delY * (h/d);
        ry = delX * (h/d);
        double interP1X = p2X + rx;
        double interP2X = p2X - rx;
        double interP1Y = p2Y + ry;
        double interP2Y = p2Y - ry;
        delX = interP1X - x2;
        delY = interP1Y - y2;
        double d1 = Math.sqrt((delY*delY) + (delX*delX));
        delX = interP2X - x2;
        delY = interP2Y - y2;
        double d2 = Math.sqrt((delY*delY) + (delX*delX));
        if(Math.abs(d1 - r2) < THRESHOLD) {
            System.out.println("Intersection point--> " + "(" + interP1X + "," + interP1Y + ")");
        }
        else if(Math.abs(d2 - r2) < THRESHOLD) {
            System.out.println("Intersection point-->" + "(" + interP2X + "," + interP2Y + ")");
        }
        else {
            System.out.println("No intersection point found");
        }
        return true;
    }
    public static void main(String[] args) {
        findIntersectionPoint(3.0, 0.0, 3.0, -1.0, -1.0, Math.sqrt(2), 1.0, 1.0, Math.sqrt(2));
    }
}