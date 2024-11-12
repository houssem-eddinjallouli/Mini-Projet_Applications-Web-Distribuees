package tn.esprit.g_un.gestion_station_ski;


import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import tn.esprit.g_un.gestion_station_ski.entities.Instructor;
import tn.esprit.g_un.gestion_station_ski.repositories.IInstructorRepository;
import tn.esprit.g_un.gestion_station_ski.services.InstructorServicesImpl;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class InstructorServicesImplTest {

    @Mock
    private IInstructorRepository instructorRepository;

    @InjectMocks
    private InstructorServicesImpl instructorServices;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testAddInstructor() {
        Instructor instructor = new Instructor();
        instructor.setFirstName("John");
        instructor.setLastName("Doe");
        instructor.setDateOfHire(LocalDate.now());

        when(instructorRepository.save(instructor)).thenReturn(instructor);

        Instructor result = instructorServices.addInstructor(instructor);

        assertNotNull(result);
        assertEquals("John", result.getFirstName());
        assertEquals("Doe", result.getLastName());
        verify(instructorRepository, times(1)).save(instructor);
    }

    @Test
    void testUpdateInstructor() {
        Long numInstructor = 1L;
        Instructor instructor = new Instructor();
        instructor.setNumInstructor(numInstructor);
        instructor.setFirstName("John");
        instructor.setLastName("Smith");
        instructor.setDateOfHire(LocalDate.now());

        when(instructorRepository.save(instructor)).thenReturn(instructor);

        Instructor result = instructorServices.updateInstructor(instructor);

        assertNotNull(result);
        assertEquals(numInstructor, result.getNumInstructor());
        verify(instructorRepository, times(1)).save(instructor);
    }

    @Test
    void testRetrieveInstructor() {
        Long numInstructor = 1L;
        Instructor instructor = new Instructor();
        instructor.setNumInstructor(numInstructor);
        instructor.setFirstName("Jane");
        instructor.setLastName("Doe");
        instructor.setDateOfHire(LocalDate.now());

        when(instructorRepository.findById(numInstructor)).thenReturn(Optional.of(instructor));

        Instructor result = instructorServices.retrieveInstructor(numInstructor);

        assertNotNull(result);
        assertEquals(numInstructor, result.getNumInstructor());
        verify(instructorRepository, times(1)).findById(numInstructor);
    }

    @Test
    void testRetrieveInstructor_NotFound() {
        Long numInstructor = 1L;

        when(instructorRepository.findById(numInstructor)).thenReturn(Optional.empty());

        Instructor result = instructorServices.retrieveInstructor(numInstructor);

        assertNull(result);
        verify(instructorRepository, times(1)).findById(numInstructor);
    }

    @Test
    void testRetrieveAllInstructors() {
        List<Instructor> instructors = new ArrayList<>();
        instructors.add(new Instructor(1L, "John", "Doe", LocalDate.now()));
        instructors.add(new Instructor(2L, "Jane", "Smith", LocalDate.now().minusYears(1)));

        when(instructorRepository.findAll()).thenReturn(instructors);

        List<Instructor> result = instructorServices.retrieveAllInstructors();

        assertNotNull(result);
        assertEquals(2, result.size());
        verify(instructorRepository, times(1)).findAll();
    }

    @Test
    void testDeleteInstructor() {
        Long numInstructor = 1L;

        doNothing().when(instructorRepository).deleteById(numInstructor);

        instructorServices.deleteinstructor(numInstructor);

        verify(instructorRepository, times(1)).deleteById(numInstructor);
    }
}