package tn.esprit.g_un.gestion_station_ski.services;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import tn.esprit.g_un.gestion_station_ski.entities.Course;
import tn.esprit.g_un.gestion_station_ski.repositories.ICourseRepository;

import java.util.List;
@AllArgsConstructor
@Service
public class CourseServicesImpl implements  ICourseServices{

    private ICourseRepository courseRepository;

    @Override
    public List<Course> retrieveAllCourses() {
        return courseRepository.findAll();
    }

    @Override
    public Course addCourse(Course course) {
        return courseRepository.save(course);
    }

    @Override
    public Course updateCourse(Course course) {
        return courseRepository.save(course);
    }

    @Override
    public Course retrieveCourse(Long numCourse) {
        return courseRepository.findById(numCourse).orElse(null);
    }


}
