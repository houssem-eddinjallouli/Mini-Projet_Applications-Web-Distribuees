package tn.esprit.g_un.gestion_station_ski.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.io.Serializable;
import java.util.Set;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level=AccessLevel.PRIVATE)
@Entity
public class Course implements Serializable {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	Long numCourse;
	int level;
	@Enumerated(EnumType.STRING)
	TypeCourse typeCourse;
	@Enumerated(EnumType.STRING)
	Support support;
	Float price;
	int timeSlot;

	@JsonIgnore
	@OneToMany(mappedBy= "course")
	Set<Registration> registrations;

}
