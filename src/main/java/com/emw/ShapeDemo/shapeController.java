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

    @GetMapping("/workflow")
    public Workflow getShape() {
       //Shape[] array = new Shape[100];
        Workflow workflows= new Workflow();
        try {
            Gson gson = new Gson();
            Reader reader = Files.newBufferedReader(Paths.get("user.json"));
            //List<Shape> shapeList = new Gson().fromJson(reader, new TypeToken<List<Shape>>() {}.getType());
            //array=shapeList.toArray(new Shape[100]);
            workflows=new Gson().fromJson(reader,Workflow.class);
            System.out.println(workflows);
            reader.close();
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return workflows;
    }
    @PostMapping("/workflow")
    public String saveShape(@RequestBody Workflow x) throws IOException {
        try {
            Writer writer = new FileWriter("user.json");
            System.out.println(x);
            new Gson().toJson(x, writer);
            writer.close();

        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return "success";
    }
}

