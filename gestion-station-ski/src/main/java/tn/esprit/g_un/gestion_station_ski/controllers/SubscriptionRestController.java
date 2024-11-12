package tn.esprit.g_un.gestion_station_ski.controllers;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import tn.esprit.g_un.gestion_station_ski.entities.Subscription;
import tn.esprit.g_un.gestion_station_ski.entities.TypeSubscription;
import tn.esprit.g_un.gestion_station_ski.services.ISubscriptionServices;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

@Tag(name = "\uD83D\uDC65 Subscription Management")
@RestController
@RequestMapping("/subscription")
@RequiredArgsConstructor
public class SubscriptionRestController {

    private final ISubscriptionServices subscriptionServices;

    @Operation(description = "Add Subscription ")
    @PostMapping("/add")
    public Subscription addSubscription(@RequestBody Subscription subscription){
        return  subscriptionServices.addSubscription(subscription);
    }
    @Operation(description = "Retrieve Subscription by Id")
    @GetMapping("/get/{id-subscription}")
    public Subscription getById(@PathVariable("id-subscription") Long numSubscription){
        return subscriptionServices.retrieveSubscriptionById(numSubscription);
    }
    
    @Operation(description = "Retrieve Subscriptions by Type")
    @GetMapping("/all/{typeSub}")
    public Set<Subscription> getSubscriptionsByType(@PathVariable("typeSub") TypeSubscription typeSubscription){
        return subscriptionServices.getSubscriptionByType(typeSubscription);
    }
    @Operation(description = "Update Subscription ")
    @PutMapping("/update")
    public Subscription updateSubscription(@RequestBody Subscription subscription){
        return  subscriptionServices.updateSubscription(subscription);
    }
    @Operation(description = "Retrieve Subscriptions created between two dates")
    @GetMapping("/all/{date1}/{date2}")
    public List<Subscription> getSubscriptionsByDates(@PathVariable("date1") LocalDate startDate,
                                                      @PathVariable("date2") LocalDate endDate){
        return subscriptionServices.retrieveSubscriptionsByDates(startDate, endDate);
    }



    @GetMapping("/getall")
    public List<Subscription> getall(){
        return subscriptionServices.getall();
    }

    @DeleteMapping("/del/{date1}")
    public void deletes(@PathVariable("date1") Long id){
        subscriptionServices.delete(id);
    }


}
