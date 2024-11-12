package tn.esprit.g_un.gestion_station_ski.services;

import tn.esprit.g_un.gestion_station_ski.entities.Instructor;

import java.util.List;

public interface IInstructorServices {

    Instructor addInstructor(Instructor instructor);

    List<Instructor> retrieveAllInstructors();

    Instructor updateInstructor(Instructor instructor);

    Instructor retrieveInstructor(Long numInstructor);

    Instructor addInstructorAndAssignToCourse(Instructor instructor, Long numCourse);

    void deleteinstructor(Long aLong);

}
