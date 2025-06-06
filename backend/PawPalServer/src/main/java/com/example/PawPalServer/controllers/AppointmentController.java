package com.example.PawPalServer.controllers;


import com.example.PawPalServer.domains.dtos.appointment.AppointmentDto;
import com.example.PawPalServer.domains.entities.Appointment;
import com.example.PawPalServer.enums.AppointmentType;
import com.example.PawPalServer.mappers.interfaces.Mapper;
import com.example.PawPalServer.services.interfaces.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    @Autowired
    private Mapper<AppointmentDto, Appointment> appointmentMapper;

    @GetMapping("/api/appointment/{id}")
    public ResponseEntity<AppointmentDto> getAppointments(@PathVariable("id") Integer id){
        Optional<Appointment> result = appointmentService.getAppointmentById(id);
        return result.map(appointment -> new ResponseEntity<>(appointmentMapper.mapToDto(appointment), HttpStatus.OK))
                        .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/api/appointment")
    public ResponseEntity<AppointmentDto> createAppointment(@RequestBody AppointmentDto appointmentDto){
        Appointment savedAppointment = appointmentService.createAppointment(appointmentMapper.mapToEntity(appointmentDto));
        return new ResponseEntity<>(appointmentMapper.mapToDto(savedAppointment), HttpStatus.CREATED);
    }

    @PutMapping("/api/appointment/{id}")
    public ResponseEntity<AppointmentDto> updateAppointment(@PathVariable("id") Integer id, @RequestBody AppointmentDto appointmentDto){
        if (appointmentService.isExist(id)){
            Appointment updatedAppointment = appointmentService.updateAppointment(appointmentMapper.mapToEntity(appointmentDto));
            return new ResponseEntity<>(appointmentMapper.mapToDto(updatedAppointment), HttpStatus.OK);
        }else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/api/appointment/{id}")
    public void deleteAppointment(@PathVariable("id") Integer id){
        appointmentService.delete(id);
    }

    @GetMapping("/api/appointment/user/{userId}")
    public ResponseEntity<List<AppointmentDto>> getAppointmentsByUser(@PathVariable("userId") Integer userId) {
        List<AppointmentDto> dtoList = appointmentService.getAppointmentsByUserId(userId)
                .stream()
                .map(appointmentMapper::mapToDto)
                .toList();
        return ResponseEntity.ok(dtoList);
    }

    @GetMapping("/api/appointment/user/type/{userId}")
    public ResponseEntity<List<AppointmentDto>> getAppointmentsByUserWithType(@PathVariable("userId") Integer userId, @RequestParam AppointmentType appointmentType) {
        List<AppointmentDto> dtoList = appointmentService.getAppointmentsByUserIdWithType(userId, appointmentType)
                .stream()
                .map(appointmentMapper::mapToDto)
                .toList();
        return ResponseEntity.ok(dtoList);
    }

    @GetMapping("/api/appointment/user/today/{userId}")
    public ResponseEntity<List<AppointmentDto>> getTodayAppointmentsByUser(@PathVariable("userId") Integer userId) {
        List<AppointmentDto> dtoList = appointmentService.getAppointmentByUserToday(userId)
                .stream()
                .map(appointmentMapper::mapToDto)
                .toList();
        return ResponseEntity.ok(dtoList);
    }

    @GetMapping("/api/appointment/staff/all")
    public ResponseEntity<List<AppointmentDto>> getAllAppointments() {
        List<AppointmentDto> dtoList = appointmentService.getAppointments()
                .stream()
                .map(appointmentMapper::mapToDto)
                .toList();
        return ResponseEntity.ok(dtoList);
    }

    @GetMapping("/api/appointment/staff/paged")
    public ResponseEntity<Page<AppointmentDto>> getAllAppointmentsPaged(
            @PageableDefault(sort = "appointmentDate", direction = Sort.Direction.ASC) Pageable pageable) {
        return ResponseEntity.ok(
                appointmentService.getAppointments(pageable).map(appointmentMapper::mapToDto)
        );
    }

    @GetMapping("/api/appointment/staff/today")
    public ResponseEntity<List<AppointmentDto>> getTodayAppointments() {
        List<AppointmentDto> dtoList = appointmentService.getAppointmentsToday()
                .stream()
                .map(appointmentMapper::mapToDto)
                .toList();
        return ResponseEntity.ok(dtoList);
    }

    @GetMapping("/api/appointment/staff/new")
    public ResponseEntity<Page<AppointmentDto>> getNewAppointments(
            @PageableDefault(sort = "appointmentDate", direction = Sort.Direction.ASC) Pageable pageable) {
        return ResponseEntity.ok(
                appointmentService.getAppointmentsNew(pageable).map(appointmentMapper::mapToDto)
        );
    }

    @GetMapping("/api/appointment/staff/history")
    public ResponseEntity<Page<AppointmentDto>> getAppointmentHistory(
            @PageableDefault(sort = "appointmentDate", direction = Sort.Direction.ASC) Pageable pageable) {
        return ResponseEntity.ok(
                appointmentService.getAppointmentsHistory(pageable).map(appointmentMapper::mapToDto)
        );
    }

    @GetMapping("/api/appointment/vet/today/{vetId}")
    public ResponseEntity<List<AppointmentDto>> getVetAppointmentsToday(@PathVariable("vetId") Integer vetId) {
        List<AppointmentDto> dtoList = appointmentService.getAppointmentByVetToday(vetId)
                .stream()
                .map(appointmentMapper::mapToDto)
                .toList();
        return ResponseEntity.ok(dtoList);
    }

    @GetMapping("/api/appointment/vet/upcoming/{vetId}")
    public ResponseEntity<Page<AppointmentDto>> getVetUpcomingAppointments(
            @PathVariable("vetId") Integer vetId,
            @PageableDefault(sort = "appointmentDate", direction = Sort.Direction.ASC) Pageable pageable) {
        return ResponseEntity.ok(
                appointmentService.getAppointmentByVetUpcoming(vetId, pageable)
                        .map(appointmentMapper::mapToDto)
        );
    }

    @GetMapping("/api/appointment/vet/history/{vetId}")
    public ResponseEntity<Page<AppointmentDto>> getVetAppointmentHistory(
            @PathVariable("vetId") Integer vetId,
            @PageableDefault(sort = "appointmentDate", direction = Sort.Direction.ASC) Pageable pageable) {
        return ResponseEntity.ok(
                appointmentService.getAppointmentByVetHistory(vetId, pageable)
                        .map(appointmentMapper::mapToDto)
        );
    }
}
