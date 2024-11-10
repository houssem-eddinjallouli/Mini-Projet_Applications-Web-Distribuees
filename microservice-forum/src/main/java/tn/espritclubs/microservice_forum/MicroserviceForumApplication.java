package tn.espritclubs.microservice_forum;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@EnableDiscoveryClient
@SpringBootApplication
public class MicroserviceForumApplication {

	public static void main(String[] args) {
		SpringApplication.run(MicroserviceForumApplication.class, args);
	}

}
