package com.example.PawPalServer.services.implement;

import com.example.PawPalServer.domains.entities.Appointment;
import com.example.PawPalServer.enums.ServiceStatus;
import com.example.PawPalServer.repositories.AppointmentRepository;
import com.example.PawPalServer.services.interfaces.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@Service
public class AppointmentServiceImpl implements AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Override
    public Optional<Appointment> getAppointmentById(Integer id) {
        return appointmentRepository.findById(id);
    }

    @Override
    public Appointment createAppointment(Appointment appointment) {
        return appointmentRepository.save(appointment);
    }

    @Override
    public Appointment updateAppointment(Appointment appointment) {
        return appointmentRepository.save(appointment);
    }

    @Override
    public boolean isExist(Integer id) {
        return appointmentRepository.existsById(id);
    }

    @Override
    public void delete(Integer id) {
        appointmentRepository.deleteById(id);
    }

    @Override
    public List<Appointment> getAppointments() {
        return appointmentRepository.findAll();
    }

    @Override
    public Page<Appointment> getAppointments(Pageable pageable) {
        return appointmentRepository.findAll(pageable);
    }

    @Override
    public List<Appointment> getAppointmentsToday() {
        LocalDate today = LocalDate.now();
        LocalDateTime startOfDay = today.atStartOfDay(); // 00:00
        LocalDateTime endOfDay = today.atTime(LocalTime.MAX); // 23:59:59.999999999
        return appointmentRepository.findByAppointmentDateBetween(startOfDay, endOfDay);
    }

    @Override
    public Page<Appointment> getAppointmentsNew(Pageable pageable) {
        ServiceStatus serviceStatus = ServiceStatus.PENDING;
        return appointmentRepository.findByStatus(serviceStatus);
    }

    @Override
    public Page<Appointment> getAppointmentsHistory(Pageable pageable) {
        return appointmentRepository.findByAppointmentDateBefore(LocalDateTime.now(), pageable);
    }

    @Override
    public List<Appointment> getAppointmentsByUserId(Integer userId) {
        return appointmentRepository.findByOwner_UserId(userId);
    }

    @Override
    public List<Appointment> getAppointmentByUserToday(Integer userId) {
        LocalDateTime startOfDay = LocalDateTime.now().toLocalDate().atStartOfDay(); // 00:00 today
        LocalDateTime endOfDay = LocalDateTime.now().toLocalDate().atTime(23, 59, 59); // 23:59:59 today

        return appointmentRepository.findByOwner_UserIdAndAppointmentDateBetween(userId, startOfDay, endOfDay);
    }

    @Override
    public List<Appointment> getAppointmentByVetToday(Integer userId) {
        LocalDateTime startOfDay = LocalDateTime.now().toLocalDate().atStartOfDay(); // Today 00:00
        LocalDateTime endOfDay = LocalDateTime.now().toLocalDate().atTime(23, 59, 59); // Today 23:59:59

        return appointmentRepository.findByVeterinarian_UserIdAndAppointmentDateBetween(
                userId, startOfDay, endOfDay
        );
    }

    @Override
    public Page<Appointment> getAppointmentByVetUpcoming(Integer vetId, Pageable pageable) {
        LocalDateTime now = LocalDateTime.now();
        return appointmentRepository.findByVeterinarian_UserIdAndAppointmentDateAfter(vetId, now, pageable);
    }

    @Override
    public Page<Appointment> getAppointmentByVetHistory(Integer vetId, Pageable pageable) {
        LocalDateTime now = LocalDateTime.now();
        return appointmentRepository.findByVeterinarian_UserIdAndAppointmentDateBefore(vetId, now, pageable);
    }


}
