package com.example.PawPalServer.domains.dtos.appointment;

import com.example.PawPalServer.domains.dtos.pet.PetDto;
import com.example.PawPalServer.domains.dtos.user.UserDto;
import com.example.PawPalServer.enums.AppointmentType;
import com.example.PawPalServer.enums.ServiceStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AppointmentDto {
    private Integer appointmentId;
    private PetDto pet;
    private UserDto owner;
    private UserDto veterinarian;
    private LocalDateTime appointmentDate;
    private AppointmentType appointmentType;
    private ServiceStatus status;
    private String notes;
    private String notesFromClient;
}
