package com.example.PawPalServer.repositories;

import com.example.PawPalServer.domains.entities.GroomingService;
import com.example.PawPalServer.enums.GroomingServiceType;
import com.example.PawPalServer.enums.RecurrencePattern;
import com.example.PawPalServer.enums.ServiceStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface GroomingServiceRepository extends JpaRepository<GroomingService, Integer> {
    List<GroomingService> findByServiceDateBetween(LocalDateTime start, LocalDateTime end);

    List<GroomingService> findByServiceType(GroomingServiceType groomingServiceType);

    Page<GroomingService> findByStatusNot(ServiceStatus serviceStatus, Pageable pageable);

    List<GroomingService> findByStatus(ServiceStatus serviceStatus);

    Page<GroomingService> findByRecurrencePattern(RecurrencePattern recurrencePattern, Pageable pageable);

    List<GroomingService> findByOwner_UserId(Integer userId);
}
