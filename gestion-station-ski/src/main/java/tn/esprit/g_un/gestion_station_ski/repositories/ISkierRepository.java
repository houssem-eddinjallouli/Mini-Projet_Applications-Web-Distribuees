package tn.esprit.g_un.gestion_station_ski.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.g_un.gestion_station_ski.entities.Skier;
import tn.esprit.g_un.gestion_station_ski.entities.Subscription;
import tn.esprit.g_un.gestion_station_ski.entities.TypeSubscription;

import java.util.List;

public interface ISkierRepository extends JpaRepository<Skier, Long> {
   List<Skier> findBySubscription_TypeSub(TypeSubscription typeSubscription);
   Skier findBySubscription(Subscription subscription);


}
