package tn.esprit.g_un.gestion_station_ski;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class GestionStationSkiApplication {

	public static void main(String[] args) {
		SpringApplication.run(GestionStationSkiApplication.class, args);
	}

}
