package com.example.webproject;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class WebprojectApplication {

    public static void main(String[] args) {
        SpringApplication.run(WebprojectApplication.class, args);
    }

}
