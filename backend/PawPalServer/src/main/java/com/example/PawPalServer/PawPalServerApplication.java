package com.example.PawPalServer;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class PawPalServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(PawPalServerApplication.class, args);
	}

}
