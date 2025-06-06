package com.example.PawPalServer.services.interfaces;

import com.example.PawPalServer.domains.entities.GroomingService;
import com.example.PawPalServer.enums.GroomingServiceType;
import com.example.PawPalServer.enums.RecurrencePattern;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface GroomingServiceInterface {

    List<GroomingService> getGroomingBookingByDate(LocalDateTime start, LocalDateTime end);
    List<GroomingService> getGroomingBookingByType(GroomingServiceType groomingServiceType);
    Page<GroomingService> getGroomingBookingHistory(Pageable pageable);
    List<GroomingService> getNewGroomingBooking();
    Page<GroomingService> getPeriodGroomingBooking(RecurrencePattern recurrencePattern, Pageable pageable);

    List<GroomingService> getGroomingByUser(Integer userId);

    Optional<GroomingService> getGroomingService(Integer id);
    GroomingService createGroomingService(GroomingService groomingService);
    GroomingService updateGroomingService(GroomingService groomingService);
    boolean isExist(Integer id);
    void delete(Integer id);
}
