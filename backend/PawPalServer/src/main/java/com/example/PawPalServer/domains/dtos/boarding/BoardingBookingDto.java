package com.example.PawPalServer.domains.dtos.boarding;

import com.example.PawPalServer.domains.dtos.pet.PetDto;
import com.example.PawPalServer.domains.dtos.room.BoardingRoomDto;
import com.example.PawPalServer.domains.dtos.user.UserDto;
import com.example.PawPalServer.enums.ServiceStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BoardingBookingDto {
    private Integer bookingId;
    private PetDto pet;
    private UserDto owner;
    private UserDto staff;
    private BoardingRoomDto room;
    private LocalDate checkInDate;
    private LocalDate checkOutDate;
    private ServiceStatus status;
    private String notes;
    private String notesFromClient;
}
