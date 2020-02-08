package com.emw.ShapeDemo;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import java.io.*;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

@RestController
public class shapeController {
    //Shape[] temp = new Shape[100];

    @GetMapping("/shape")
    public  Shape[] getShape() {

        Shape[] array= new Shape[100];
        try {
            Gson gson = new Gson();
            Reader reader = Files.newBufferedReader(Paths.get("user.json"));
            List<Shape> shapes = new Gson().fromJson(reader, new TypeToken<List<Shape>>() {}.getType());
            array = shapes.toArray(new Shape[100]);
            shapes.forEach(System.out::println);
            reader.close();
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return array;
    }
    @PostMapping("/shape")
    public String saveShape(@RequestBody Shape[] shape) throws IOException {
        try {
            Writer writer = new FileWriter("user.json");
            new Gson().toJson(shape, writer);
            writer.close();

        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return "success";
    }
}

