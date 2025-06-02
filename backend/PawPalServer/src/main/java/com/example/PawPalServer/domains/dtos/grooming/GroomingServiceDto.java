package com.example.PawPalServer.domains.dtos.grooming;

import com.example.PawPalServer.domains.dtos.pet.PetDto;
import com.example.PawPalServer.domains.dtos.user.UserDto;
import com.example.PawPalServer.enums.GroomingServiceType;
import com.example.PawPalServer.enums.RecurrencePattern;
import com.example.PawPalServer.enums.ServiceStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GroomingServiceDto {
    private Integer groomingId;
    private PetDto pet;
    private UserDto owner;
    private UserDto staff;
    private LocalDateTime serviceDate;
    private GroomingServiceType serviceType;
    private ServiceStatus status;
    private String notes;
    private String notesFromClient;
    private RecurrencePattern recurrencePattern;
}
