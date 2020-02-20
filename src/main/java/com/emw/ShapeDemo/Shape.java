package com.emw.ShapeDemo;

import lombok.Data;

@Data
public class Shape {
    private long x;
    private long y;
    private String type;
    private String id;
    private Shape2 next;
    private Shape2 previous;
    private String[] userdata;


}
