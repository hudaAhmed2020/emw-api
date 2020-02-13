package com.emw.ShapeDemo;

public class Shape {
    private long x;
    private long y;
    private String type;
    private String id;
    private Shape next;
    private Shape previous;

    public Shape getNext() {  return next; }

    public void setNext(Shape next) { this.next = next; }

    public Shape getPrevious() { return previous; }

    public void setPrevious(Shape previous) { this.previous = previous; }

    public String getId() { return id; }

    public void setId(String id) { this.id = id; }

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
