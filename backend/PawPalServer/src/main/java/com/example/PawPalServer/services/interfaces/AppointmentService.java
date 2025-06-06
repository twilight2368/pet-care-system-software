package com.example.PawPalServer.services.interfaces;

import com.example.PawPalServer.domains.entities.Appointment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface AppointmentService {
    Optional<Appointment> getAppointmentById(Integer id);
    Appointment createAppointment(Appointment appointment);
    Appointment updateAppointment(Appointment appointment);
    boolean isExist(Integer id);
    void delete(Integer id);

    //Staff
    List<Appointment> getAppointments();
    Page<Appointment> getAppointments(Pageable pageable);
    List<Appointment> getAppointmentsToday();
    Page<Appointment> getAppointmentsNew(Pageable pageable);
    Page<Appointment> getAppointmentsHistory(Pageable pageable);

    //User
    List<Appointment> getAppointmentsByUserId(Integer userId);
    List<Appointment> getAppointmentByUserToday(Integer userId);

    //Vet
    List<Appointment> getAppointmentByVetToday(Integer userId);
    Page<Appointment> getAppointmentByVetUpcoming(Integer vetId, Pageable pageable);

    Page<Appointment> getAppointmentByVetHistory(Integer vetId, Pageable pageable);
}
