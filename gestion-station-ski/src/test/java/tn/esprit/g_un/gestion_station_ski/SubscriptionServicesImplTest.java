package tn.esprit.g_un.gestion_station_ski;


import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import tn.esprit.g_un.gestion_station_ski.entities.Subscription;
import tn.esprit.g_un.gestion_station_ski.entities.TypeSubscription;
import tn.esprit.g_un.gestion_station_ski.repositories.ISubscriptionRepository;
import tn.esprit.g_un.gestion_station_ski.services.SubscriptionServicesImpl;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class SubscriptionServicesImplTest {

    @Mock
    private ISubscriptionRepository subscriptionRepository;

    @InjectMocks
    private SubscriptionServicesImpl subscriptionServices;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testAddSubscription() {
        LocalDate startDate = LocalDate.now();
        Subscription subscription = new Subscription(null, startDate, null, 100.0f, TypeSubscription.ANNUAL);
        when(subscriptionRepository.save(subscription)).thenReturn(subscription);

        Subscription result = subscriptionServices.addSubscription(subscription);

        assertNotNull(result);
        assertEquals(TypeSubscription.ANNUAL, result.getTypeSub());
        assertNotNull(result.getEndDate());
        verify(subscriptionRepository, times(1)).save(subscription);
    }

    @Test
    void testUpdateSubscription() {
        Long numSub = 1L;
        LocalDate startDate = LocalDate.now();
        Subscription subscription = new Subscription(numSub, startDate, null, 100.0f, TypeSubscription.MONTHLY);
        when(subscriptionRepository.save(subscription)).thenReturn(subscription);

        Subscription result = subscriptionServices.updateSubscription(subscription);

        assertNotNull(result);
        assertEquals(numSub, result.getNumSub());
        verify(subscriptionRepository, times(1)).save(subscription);
    }

    @Test
    void testRetrieveSubscriptionById() {
        Long numSub = 1L;
        LocalDate startDate = LocalDate.now();
        Subscription subscription = new Subscription(numSub, startDate, LocalDate.now().plusMonths(1), 50.0f, TypeSubscription.MONTHLY);

        when(subscriptionRepository.findById(numSub)).thenReturn(Optional.of(subscription));

        Subscription result = subscriptionServices.retrieveSubscriptionById(numSub);

        assertNotNull(result);
        assertEquals(numSub, result.getNumSub());
        verify(subscriptionRepository, times(1)).findById(numSub);
    }

    @Test
    void testRetrieveSubscriptionById_NotFound() {
        Long numSub = 1L;

        when(subscriptionRepository.findById(numSub)).thenReturn(Optional.empty());

        Subscription result = subscriptionServices.retrieveSubscriptionById(numSub);

        assertNull(result);
        verify(subscriptionRepository, times(1)).findById(numSub);
    }

    @Test
    void testGetSubscriptionByType() {
        TypeSubscription type = TypeSubscription.ANNUAL;
        List<Subscription> subscriptions = new ArrayList<>();
        subscriptions.add(new Subscription(1L, LocalDate.now(), LocalDate.now().plusYears(1), 200.0f, type));

        when(subscriptionRepository.findByTypeSubOrderByStartDateAsc(type)).thenReturn(Set.copyOf(subscriptions));

        Set<Subscription> result = subscriptionServices.getSubscriptionByType(type);

        assertNotNull(result);
        assertEquals(1, result.size());
        verify(subscriptionRepository, times(1)).findByTypeSubOrderByStartDateAsc(type);
    }

    @Test
    void testRetrieveSubscriptionsByDates() {
        LocalDate startDate = LocalDate.now();
        LocalDate endDate = LocalDate.now().plusMonths(1);
        List<Subscription> subscriptions = new ArrayList<>();
        subscriptions.add(new Subscription(1L, startDate, endDate, 100.0f, TypeSubscription.MONTHLY));

        when(subscriptionRepository.getSubscriptionsByStartDateBetween(startDate, endDate)).thenReturn(subscriptions);

        List<Subscription> result = subscriptionServices.retrieveSubscriptionsByDates(startDate, endDate);

        assertNotNull(result);
        assertEquals(1, result.size());
        verify(subscriptionRepository, times(1)).getSubscriptionsByStartDateBetween(startDate, endDate);
    }

    @Test
    void testGetAllSubscriptions() {
        List<Subscription> subscriptions = new ArrayList<>();
        subscriptions.add(new Subscription(1L, LocalDate.now(), LocalDate.now().plusMonths(1), 50.0f, TypeSubscription.MONTHLY));
        subscriptions.add(new Subscription(2L, LocalDate.now(), LocalDate.now().plusYears(1), 200.0f, TypeSubscription.ANNUAL));

        when(subscriptionRepository.findAll()).thenReturn(subscriptions);

        List<Subscription> result = subscriptionServices.getall();

        assertNotNull(result);
        assertEquals(2, result.size());
        verify(subscriptionRepository, times(1)).findAll();
    }

    @Test
    void testDeleteSubscription() {
        Long numSub = 1L;

        doNothing().when(subscriptionRepository).deleteById(numSub);

        subscriptionServices.delete(numSub);

        verify(subscriptionRepository, times(1)).deleteById(numSub);
    }
}
