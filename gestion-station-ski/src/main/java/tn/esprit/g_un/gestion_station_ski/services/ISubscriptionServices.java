package tn.esprit.g_un.gestion_station_ski.services;

import tn.esprit.g_un.gestion_station_ski.entities.Subscription;
import tn.esprit.g_un.gestion_station_ski.entities.TypeSubscription;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

public interface ISubscriptionServices {

	Subscription addSubscription(Subscription subscription);

	Subscription updateSubscription(Subscription subscription);

	Subscription retrieveSubscriptionById(Long numSubscription);

	Set<Subscription> getSubscriptionByType(TypeSubscription type);

	List<Subscription> retrieveSubscriptionsByDates(LocalDate startDate, LocalDate endDate);

	void retrieveSubscriptions();
	List<Subscription> getall();
	void delete(Long id);
}
