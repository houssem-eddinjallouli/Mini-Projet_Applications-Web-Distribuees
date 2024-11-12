package tn.esprit.g_un.gestion_station_ski.entities;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.io.Serializable;
import java.time.LocalDate;
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level=AccessLevel.PRIVATE)
@Entity
public class Subscription implements Serializable {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	Long numSub;
	LocalDate startDate;
	LocalDate endDate;
	Float price;
	@Enumerated(EnumType.STRING)
	TypeSubscription typeSub;

}
