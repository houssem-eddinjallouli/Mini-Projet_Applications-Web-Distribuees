package tn.esprit.g_un.gestion_station_ski.entities;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Set;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level=AccessLevel.PRIVATE)
@Entity
public class Instructor implements Serializable {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	Long numInstructor;
	String firstName;
	String lastName;
	LocalDate dateOfHire;
	@OneToMany
	Set<Course> courses;

	public Instructor(long l, String john, String doe, LocalDate now) {
	}
}
