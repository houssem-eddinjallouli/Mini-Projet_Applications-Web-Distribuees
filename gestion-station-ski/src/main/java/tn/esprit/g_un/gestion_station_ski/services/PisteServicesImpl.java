package tn.esprit.g_un.gestion_station_ski.services;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import tn.esprit.g_un.gestion_station_ski.entities.Piste;
import tn.esprit.g_un.gestion_station_ski.repositories.IPisteRepository;

import java.util.List;
@AllArgsConstructor
@Service
public class PisteServicesImpl implements  IPisteServices{

    private IPisteRepository pisteRepository;

    @Override
    public List<Piste> retrieveAllPistes() {
        return pisteRepository.findAll();
    }

    @Override
    public Piste addPiste(Piste piste) {
        return pisteRepository.save(piste);
    }

    @Override
    public void removePiste(Long numPiste) {
        pisteRepository.deleteById(numPiste);
    }

    @Override
    public Piste retrievePiste(Long numPiste) {
        return pisteRepository.findById(numPiste).orElse(null);
    }
}
