package com.example.PawPalServer.repositories;

import com.example.PawPalServer.domains.entities.Appointment;
import com.example.PawPalServer.enums.ServiceStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Integer> {
    List<Appointment> findByAppointmentDateBetween(LocalDateTime startOfDay, LocalDateTime endOfDay);

    Page<Appointment> findByStatus(ServiceStatus serviceStatus);

    Page<Appointment> findByAppointmentDateBefore(LocalDateTime now, Pageable pageable);

    List<Appointment> findByOwner_UserId(Integer userId);

    List<Appointment> findByOwner_UserIdAndAppointmentDateBetween(Integer userId, LocalDateTime startOfDay, LocalDateTime endOfDay);

    List<Appointment> findByVeterinarian_UserIdAndAppointmentDateBetween(Integer userId, LocalDateTime startOfDay, LocalDateTime endOfDay);

    Page<Appointment> findByVeterinarian_UserIdAndAppointmentDateAfter(Integer vetId, LocalDateTime now, Pageable pageable);

    Page<Appointment> findByVeterinarian_UserIdAndAppointmentDateBefore(Integer vetId, LocalDateTime now, Pageable pageable);
}
