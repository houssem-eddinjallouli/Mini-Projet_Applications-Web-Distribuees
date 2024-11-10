package tn.espritclubs.microservice_inscriptions.services;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import tn.espritclubs.microservice_inscriptions.entities.ApplicationStudent;
import tn.espritclubs.microservice_inscriptions.repositories.ApplicationRepository;

import java.util.List;

@Service
@AllArgsConstructor
public class ApplicationServiceImpl implements IApplicationService{
    ApplicationRepository applicationRepository;
    @Override
    public ApplicationStudent addApplication(ApplicationStudent application) {
        return applicationRepository.save(application);
    }

    @Override
    public ApplicationStudent updateApplication(ApplicationStudent application) {
        return applicationRepository.save(application);
    }

    @Override
    public void deleteApplication(Long id) {
        applicationRepository.deleteById(id);
    }

    @Override
    public ApplicationStudent retrieveApplication(Long ApplicationId) {
        return applicationRepository.findById(ApplicationId).get();
    }

    @Override
    public List<ApplicationStudent> retrieveAllApplications() {
        return applicationRepository.findAll();
    }
}
