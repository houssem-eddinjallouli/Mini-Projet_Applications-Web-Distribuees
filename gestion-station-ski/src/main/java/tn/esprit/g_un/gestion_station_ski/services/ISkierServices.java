package tn.esprit.g_un.gestion_station_ski.services;

import tn.esprit.g_un.gestion_station_ski.entities.Skier;
import tn.esprit.g_un.gestion_station_ski.entities.TypeSubscription;

import java.util.List;

public interface ISkierServices {

	List<Skier> retrieveAllSkiers();

	Skier  addSkier(Skier  skier);

	Skier assignSkierToSubscription(Long numSkier, Long numSubscription);

	Skier addSkierAndAssignToCourse(Skier skier, Long numCourse);

	void removeSkier (Long numSkier);

	Skier retrieveSkier (Long numSkier);


	Skier assignSkierToPiste(Long numSkieur, Long numPiste);

	List<Skier> retrieveSkiersBySubscriptionType(TypeSubscription typeSubscription);

}
