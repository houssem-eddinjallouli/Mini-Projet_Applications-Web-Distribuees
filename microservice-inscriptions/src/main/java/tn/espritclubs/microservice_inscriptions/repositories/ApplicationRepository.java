package tn.espritclubs.microservice_inscriptions.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.espritclubs.microservice_inscriptions.entities.ApplicationStudent;

@Repository
public interface ApplicationRepository extends JpaRepository<ApplicationStudent, Long> {
}
