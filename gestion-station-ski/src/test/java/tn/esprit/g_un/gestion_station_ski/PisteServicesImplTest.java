package tn.esprit.g_un.gestion_station_ski;


import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import tn.esprit.g_un.gestion_station_ski.entities.Piste;
import tn.esprit.g_un.gestion_station_ski.repositories.IPisteRepository;
import tn.esprit.g_un.gestion_station_ski.services.PisteServicesImpl;


import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class PisteServicesImplTest {

    @Mock
    private IPisteRepository pisteRepository;

    @InjectMocks
    private PisteServicesImpl pisteServices;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testRetrieveAllPistes() {
        List<Piste> pistes = new ArrayList<>();
        pistes.add(new Piste(1L, "Piste A", null, 1000, 30, null));
        pistes.add(new Piste(2L, "Piste B", null, 1200, 25, null));

        when(pisteRepository.findAll()).thenReturn(pistes);

        List<Piste> result = pisteServices.retrieveAllPistes();

        assertEquals(2, result.size());
        verify(pisteRepository, times(1)).findAll();
    }

    @Test
    void testAddPiste() {
        Piste piste = new Piste(1L, "Piste A", null, 1000, 30, null);
        when(pisteRepository.save(piste)).thenReturn(piste);

        Piste result = pisteServices.addPiste(piste);

        assertNotNull(result);
        assertEquals("Piste A", result.getNamePiste());
        verify(pisteRepository, times(1)).save(piste);
    }

    @Test
    void testRemovePiste() {
        Long numPiste = 1L;

        doNothing().when(pisteRepository).deleteById(numPiste);

        pisteServices.removePiste(numPiste);

        verify(pisteRepository, times(1)).deleteById(numPiste);
    }

    @Test
    void testRetrievePiste() {
        Long numPiste = 1L;
        Piste piste = new Piste(numPiste, "Piste A", null, 1000, 30, null);

        when(pisteRepository.findById(numPiste)).thenReturn(Optional.of(piste));

        Piste result = pisteServices.retrievePiste(numPiste);

        assertNotNull(result);
        assertEquals(numPiste, result.getNumPiste());
        verify(pisteRepository, times(1)).findById(numPiste);
    }

    @Test
    void testRetrievePiste_NotFound() {
        Long numPiste = 1L;

        when(pisteRepository.findById(numPiste)).thenReturn(Optional.empty());

        Piste result = pisteServices.retrievePiste(numPiste);

        assertNull(result);
        verify(pisteRepository, times(1)).findById(numPiste);
    }
}
