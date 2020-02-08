package com.emw.ShapeDemo;

public class Shape {
    private long x;
    private long y;
    private String type;

    public long getX() {
        return x;
    }

    public void setX(long x) {
        this.x = x;
    }

    public long getY() {
        return y;
    }

    public void setY(long y) {
        this.y = y;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    @Override
    public String toString() {
        return "Shape{" +
                "x=" + x +
                ", y=" + y +
                ", type='" + type + '\'' +
                '}';
    }
}
