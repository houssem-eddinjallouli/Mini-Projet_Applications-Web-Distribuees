package tn.espritclubs.microservice_inscriptions.services;

import tn.espritclubs.microservice_inscriptions.entities.ApplicationStudent;

import java.util.List;

public interface IApplicationService {
    public ApplicationStudent addApplication (ApplicationStudent application);
    ApplicationStudent updateApplication(ApplicationStudent application);
    void deleteApplication(Long id);
    public ApplicationStudent retrieveApplication(Long ApplicationId);
    List<ApplicationStudent> retrieveAllApplications();
}
