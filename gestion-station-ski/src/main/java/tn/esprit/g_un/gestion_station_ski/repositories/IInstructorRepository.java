package tn.esprit.g_un.gestion_station_ski.repositories;


import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.g_un.gestion_station_ski.entities.Instructor;



public interface IInstructorRepository extends JpaRepository<Instructor, Long> {

}
