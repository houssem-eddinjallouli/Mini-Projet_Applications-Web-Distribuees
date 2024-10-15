package tn.espritclubs.microservice_inscriptions.controllers;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import tn.espritclubs.microservice_inscriptions.entities.ApplicationStudent;
import tn.espritclubs.microservice_inscriptions.services.IApplicationService;

import java.util.List;


@AllArgsConstructor
@RequestMapping("/app")
@RestController
public class ApplicationRestController {

    IApplicationService applicationService;
    @PostMapping("/add_app")
    public ApplicationStudent addApplication (@RequestBody ApplicationStudent application) {
        return applicationService.addApplication(application);
    }

    @PutMapping("/modify-application")
    public ApplicationStudent updateApplication(@RequestBody ApplicationStudent application) {
        return applicationService.updateApplication(application);
    }

    @DeleteMapping("/remove-application/{application-id}")
    public void deleteApplication(@PathVariable("application-id")
                                  Long applicationId) {
        applicationService.deleteApplication(applicationId);
    }
    @GetMapping("/retrieve-application/{application-id}")
    public ApplicationStudent getApplication(@PathVariable("application-id") Long applicationId) {
        return applicationService.retrieveApplication(applicationId);
    }

    @GetMapping("/retrieve-all-applications")
    public List<ApplicationStudent> getApplications() {
        return applicationService.retrieveAllApplications();
    }
}
