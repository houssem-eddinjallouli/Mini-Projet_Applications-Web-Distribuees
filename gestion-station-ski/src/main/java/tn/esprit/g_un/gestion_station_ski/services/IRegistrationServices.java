package tn.esprit.g_un.gestion_station_ski.services;

import tn.esprit.g_un.gestion_station_ski.entities.Registration;
import tn.esprit.g_un.gestion_station_ski.entities.Support;

import java.util.List;

public interface IRegistrationServices {

	Registration addRegistrationAndAssignToSkier(Registration registration, Long numSkier);
	Registration assignRegistrationToCourse(Long numRegistration, Long numCourse);
	Registration addRegistrationAndAssignToSkierAndCourse(Registration registration, Long numSkieur, Long numCours);
	List<Integer> numWeeksCourseOfInstructorBySupport(Long numInstructor, Support support);
}

