package com.example.PawPalServer.utils;

import com.example.PawPalServer.domains.dtos.appointment.AppointmentDto;
import com.example.PawPalServer.domains.dtos.boarding.BoardingBookingDto;
import com.example.PawPalServer.domains.dtos.diet.DietPlanDto;
import com.example.PawPalServer.domains.dtos.grooming.GroomingServiceDto;
import com.example.PawPalServer.domains.dtos.medical.MedicalRecordDto;
import com.example.PawPalServer.domains.dtos.notification.NotificationDto;
import com.example.PawPalServer.domains.dtos.pet.PetDto;
import com.example.PawPalServer.domains.dtos.room.BoardingRoomDto;
import com.example.PawPalServer.domains.dtos.user.UserDto;
import com.example.PawPalServer.enums.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

public class TestDataUtils {

    public static UserDto createUserData(UserRole role) {
        return UserDto.builder()
                .username("johnDoe123")
                .fullName("John Doe")
                .role(role)
                .email("johndoe123@mail.com")
                .phone("0123456789")
                .specialization(role == UserRole.VETERINARIAN ? "Veterinarian specialization" : "")
                .isLock(false)
                .build();
    }

    public static PetDto createPetData(PetGender gender) {
        return PetDto.builder()
                .age(1)
                .breed("Dog")
                .color("Brown")
                .bloodType("AB")
                .gender(gender)
                .weightKg(null)
                .heightCm(null)
                .spayedNeutered(false)
                .microchipped(false)
                .isAlert(false)
                .healthNotes("")
                .build();
    }

    public static NotificationDto createNotificationData(NotificationType type, UserDto user, PetDto pet) {
        return NotificationDto.builder()
                .notificationId(1)
                .user(user)
                .pet(pet)
                .message("This is a " + type.name() + " notification.")
                .notificationType(type)
                .sentAt(LocalDateTime.now())
                .isRead(false)
                .build();
    }

    public static BoardingRoomDto createBoardingRoomData(String roomNumber) {
        return BoardingRoomDto.builder()
                .roomId(101)
                .roomNumber(roomNumber)
                .build();
    }

    public static MedicalRecordDto createMedicalRecordData(PetDto pet, UserDto veterinarian) {
        return MedicalRecordDto.builder()
                .recordId(1)
                .pet(pet)
                .veterinarian(veterinarian)
                .visitDate(LocalDate.now())
                .diagnosis("Healthy")
                .prescription("None")
                .vaccinationDetails("Rabies, Distemper")
                .allergies("None")
                .chronicDiseases("None")
                .build();
    }

    public static GroomingServiceDto createGroomingServiceData(PetDto pet, UserDto owner, UserDto staff,
                                                               GroomingServiceType serviceType,
                                                               ServiceStatus status,
                                                               RecurrencePattern recurrencePattern) {
        return GroomingServiceDto.builder()
                .groomingId(1)
                .pet(pet)
                .owner(owner)
                .staff(staff)
                .serviceDate(LocalDateTime.now().plusDays(1))
                .serviceType(serviceType)
                .status(status)
                .notes("No special notes")
                .notesFromClient("Please be gentle")
                .recurrencePattern(recurrencePattern)
                .build();
    }

    public static DietPlanDto createDietPlanData(PetDto pet, LocalDate startDate, LocalDate endDate, String dietDetails) {
        return DietPlanDto.builder()
                .dietId(1)
                .pet(pet)
                .dietDetails(dietDetails)
                .startDate(startDate)
                .endDate(endDate)
                .build();
    }

    public static BoardingBookingDto createBoardingBookingData(PetDto pet, UserDto owner, UserDto staff,
                                                               BoardingRoomDto room,
                                                               LocalDate checkIn, LocalDate checkOut,
                                                               ServiceStatus status) {
        return BoardingBookingDto.builder()
                .bookingId(1)
                .pet(pet)
                .owner(owner)
                .staff(staff)
                .room(room)
                .checkInDate(checkIn)
                .checkOutDate(checkOut)
                .status(status)
                .notes("No special notes")
                .notesFromClient("Please feed twice a day")
                .build();
    }

    public static AppointmentDto createAppointmentData(PetDto pet, UserDto owner, UserDto veterinarian,
                                                       LocalDateTime appointmentDate,
                                                       AppointmentType appointmentType,
                                                       ServiceStatus status) {
        return AppointmentDto.builder()
                .appointmentId(1)
                .pet(pet)
                .owner(owner)
                .veterinarian(veterinarian)
                .appointmentDate(appointmentDate)
                .appointmentType(appointmentType)
                .status(status)
                .notes("N/A")
                .notesFromClient("Please check allergies")
                .build();
    }
}
