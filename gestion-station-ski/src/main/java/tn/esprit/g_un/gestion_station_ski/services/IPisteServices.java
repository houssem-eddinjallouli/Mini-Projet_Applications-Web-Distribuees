package tn.esprit.g_un.gestion_station_ski.services;

import tn.esprit.g_un.gestion_station_ski.entities.Piste;

import java.util.List;

public interface IPisteServices {

    List<Piste> retrieveAllPistes();

    Piste  addPiste(Piste piste);

    void removePiste (Long numPiste);

    Piste retrievePiste (Long numPiste);
}
