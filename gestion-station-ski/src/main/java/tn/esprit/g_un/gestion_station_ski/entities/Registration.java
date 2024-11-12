package tn.esprit.g_un.gestion_station_ski.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.io.Serializable;
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level=AccessLevel.PRIVATE)
@Entity
public class Registration implements Serializable {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	Long numRegistration;
	int numWeek;

	@JsonIgnore
	@ManyToOne
    Skier skier;
	@JsonIgnore
	@ManyToOne
	Course course;
}
