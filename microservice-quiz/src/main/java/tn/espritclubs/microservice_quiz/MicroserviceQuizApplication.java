package tn.espritclubs.microservice_quiz;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@EnableAspectJAutoProxy
@SpringBootApplication
@EnableDiscoveryClient
public class MicroserviceQuizApplication {

	public static void main(String[] args) {
		SpringApplication.run(MicroserviceQuizApplication.class, args);
	}

}
