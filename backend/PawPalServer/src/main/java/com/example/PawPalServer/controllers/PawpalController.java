package com.example.PawPalServer.controllers;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PawpalController {
    @GetMapping("/")
    public String sayHello(){
        return "Hello world from PawPal!";
    }
}
