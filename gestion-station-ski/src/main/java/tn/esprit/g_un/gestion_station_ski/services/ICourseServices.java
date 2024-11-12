package tn.esprit.g_un.gestion_station_ski.services;

import tn.esprit.g_un.gestion_station_ski.entities.Course;

import java.util.List;

public interface ICourseServices {

    List<Course> retrieveAllCourses();

    Course  addCourse(Course  course);

    Course updateCourse(Course course);

    Course retrieveCourse(Long numCourse);


}
