package com.example.PawPalServer.integrations;

import com.example.PawPalServer.domains.dtos.boarding.BoardingBookingDto;
import com.example.PawPalServer.domains.dtos.pet.PetDto;
import com.example.PawPalServer.domains.dtos.room.BoardingRoomDto;
import com.example.PawPalServer.domains.dtos.user.UserDto;
import com.example.PawPalServer.domains.entities.BoardingBooking;
import com.example.PawPalServer.domains.entities.BoardingRoom;
import com.example.PawPalServer.domains.entities.Pet;
import com.example.PawPalServer.domains.entities.User;
import com.example.PawPalServer.enums.PetGender;
import com.example.PawPalServer.enums.ServiceStatus;
import com.example.PawPalServer.enums.UserRole;
import com.example.PawPalServer.repositories.BoardingBookingRepository;
import com.example.PawPalServer.repositories.BoardingRoomRepository;
import com.example.PawPalServer.repositories.PetRepository;
import com.example.PawPalServer.repositories.UserRepository;
import com.example.PawPalServer.utils.TestDataUtils;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
@Transactional
public class BoardingBookingControllerIntegrationTests {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PetRepository petRepository;

    @Autowired
    private BoardingRoomRepository boardingRoomRepository;

    @Autowired
    private BoardingBookingRepository boardingBookingRepository;

    private User savedOwner;
    private User savedStaff;
    private Pet savedPet;
    private BoardingRoom savedRoom;

    @BeforeEach
    void setUp() {
        boardingBookingRepository.deleteAll();
        petRepository.deleteAll();
        boardingRoomRepository.deleteAll();
        userRepository.deleteAll();

        // Create owner using TestDataUtils
        UserDto ownerDto = TestDataUtils.createUserData(UserRole.PET_OWNER);
        savedOwner = userRepository.save(User.builder()
                .username(ownerDto.getUsername())
                .fullName(ownerDto.getFullName())
                .email(ownerDto.getEmail())
                .phone(ownerDto.getPhone())
                .role(ownerDto.getRole())
                .passwordHash("testPassword123")
                .isLock(ownerDto.getIsLock())
                .build());

        // Create staff using TestDataUtils
        UserDto staffDto = TestDataUtils.createUserData(UserRole.STAFF);
        savedStaff = userRepository.save(User.builder()
                .username("staff123")
                .fullName("Test Staff")
                .email("staff@example.com")
                .phone("1111111111")
                .role(staffDto.getRole())
                .passwordHash("testPassword123")
                .isLock(staffDto.getIsLock())
                .build());

        // Create pet using TestDataUtils
        PetDto petDto = TestDataUtils.createPetData(PetGender.MALE);
        savedPet = petRepository.save(Pet.builder()
                .name("Buddy")
                .age(petDto.getAge())
                .breed(petDto.getBreed())
                .color(petDto.getColor())
                .bloodType(petDto.getBloodType())
                .gender(petDto.getGender())
                .weightKg(petDto.getWeightKg())
                .heightCm(petDto.getHeightCm())
                .spayedNeutered(petDto.getSpayedNeutered())
                .microchipped(petDto.getMicrochipped())
                .isAlert(petDto.getIsAlert())
                .healthNotes(petDto.getHealthNotes())
                .owner(savedOwner)
                .build());

        // Create boarding room using TestDataUtils
        BoardingRoomDto roomDto = TestDataUtils.createBoardingRoomData("R001");
        savedRoom = boardingRoomRepository.save(BoardingRoom.builder()
                .roomNumber(roomDto.getRoomNumber())
                .build());
    }

    @Test
    void shouldCreateBoardingBookingSuccessfully() throws Exception {
        // Create DTOs for the request
        UserDto ownerDto = UserDto.builder()
                .userId(savedOwner.getUserId())
                .username(savedOwner.getUsername())
                .fullName(savedOwner.getFullName())
                .email(savedOwner.getEmail())
                .phone(savedOwner.getPhone())
                .role(savedOwner.getRole())
                .isLock(savedOwner.getIsLock())
                .build();

        UserDto staffDto = UserDto.builder()
                .userId(savedStaff.getUserId())
                .username(savedStaff.getUsername())
                .fullName(savedStaff.getFullName())
                .email(savedStaff.getEmail())
                .phone(savedStaff.getPhone())
                .role(savedStaff.getRole())
                .isLock(savedStaff.getIsLock())
                .build();

        PetDto petDto = PetDto.builder()
                .petId(savedPet.getPetId())
                .name(savedPet.getName())
                .age(savedPet.getAge())
                .breed(savedPet.getBreed())
                .color(savedPet.getColor())
                .gender(savedPet.getGender())
                .build();

        BoardingRoomDto roomDto = BoardingRoomDto.builder()
                .roomId(savedRoom.getRoomId())
                .roomNumber(savedRoom.getRoomNumber())
                .build();

        // Create boarding booking using TestDataUtils
        BoardingBookingDto bookingDto = TestDataUtils.createBoardingBookingData(
                petDto, ownerDto, staffDto, roomDto,
                LocalDate.now().plusDays(1),
                LocalDate.now().plusDays(5),
                ServiceStatus.PENDING
        );

        mockMvc.perform(post("/api/boarding")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(bookingDto)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.owner.username").value(savedOwner.getUsername()))
                .andExpect(jsonPath("$.staff.username").value(savedStaff.getUsername()))
                .andExpect(jsonPath("$.pet.name").value(savedPet.getName()))
                .andExpect(jsonPath("$.room.roomNumber").value(savedRoom.getRoomNumber()))
                .andExpect(jsonPath("$.status").value("PENDING"));
    }

    @Test
    void shouldGetBoardingBookingByIdSuccessfully() throws Exception {
        // Create a boarding booking using TestDataUtils
        BoardingBooking booking = boardingBookingRepository.save(BoardingBooking.builder()
                .owner(savedOwner)
                .staff(savedStaff)
                .pet(savedPet)
                .room(savedRoom)
                .checkInDate(LocalDate.now().plusDays(1))
                .checkOutDate(LocalDate.now().plusDays(5))
                .status(ServiceStatus.PENDING)
                .notes("Test booking")
                .notesFromClient("Please take good care")
                .build());

        mockMvc.perform(get("/api/boarding/" + booking.getBookingId()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.owner.username").value(savedOwner.getUsername()))
                .andExpect(jsonPath("$.pet.name").value(savedPet.getName()))
                .andExpect(jsonPath("$.status").value("PENDING"));
    }

    @Test
    void shouldReturnNotFoundWhenBoardingBookingDoesNotExist() throws Exception {
        mockMvc.perform(get("/api/boarding/999999"))
                .andExpect(status().isNotFound());
    }

    @Test
    void shouldUpdateBoardingBookingSuccessfully() throws Exception {
        // Create initial booking
        BoardingBooking booking = boardingBookingRepository.save(BoardingBooking.builder()
                .owner(savedOwner)
                .staff(savedStaff)
                .pet(savedPet)
                .room(savedRoom)
                .checkInDate(LocalDate.now().plusDays(1))
                .checkOutDate(LocalDate.now().plusDays(5))
                .status(ServiceStatus.PENDING)
                .notes("Initial booking")
                .build());

        // Create DTOs for update
        UserDto ownerDto = UserDto.builder()
                .userId(savedOwner.getUserId())
                .username(savedOwner.getUsername())
                .fullName(savedOwner.getFullName())
                .email(savedOwner.getEmail())
                .phone(savedOwner.getPhone())
                .role(savedOwner.getRole())
                .isLock(savedOwner.getIsLock())
                .build();

        UserDto staffDto = UserDto.builder()
                .userId(savedStaff.getUserId())
                .username(savedStaff.getUsername())
                .fullName(savedStaff.getFullName())
                .email(savedStaff.getEmail())
                .phone(savedStaff.getPhone())
                .role(savedStaff.getRole())
                .isLock(savedStaff.getIsLock())
                .build();

        PetDto petDto = PetDto.builder()
                .petId(savedPet.getPetId())
                .name(savedPet.getName())
                .age(savedPet.getAge())
                .breed(savedPet.getBreed())
                .color(savedPet.getColor())
                .gender(savedPet.getGender())
                .build();

        BoardingRoomDto roomDto = BoardingRoomDto.builder()
                .roomId(savedRoom.getRoomId())
                .roomNumber(savedRoom.getRoomNumber())
                .build();

        // Create updated booking using TestDataUtils
        BoardingBookingDto updatedBookingDto = TestDataUtils.createBoardingBookingData(
                petDto, ownerDto, staffDto, roomDto,
                LocalDate.now().plusDays(2),
                LocalDate.now().plusDays(6),
                ServiceStatus.CONFIRMED
        );
        updatedBookingDto.setBookingId(booking.getBookingId());
        updatedBookingDto.setNotes("Updated booking");

        mockMvc.perform(put("/api/boarding/" + booking.getBookingId())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(updatedBookingDto)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("CONFIRMED"))
                .andExpect(jsonPath("$.notes").value("Updated booking"));
    }

    @Test
    void shouldReturnNotFoundWhenUpdatingNonExistentBoardingBooking() throws Exception {
        BoardingBookingDto bookingDto = TestDataUtils.createBoardingBookingData(
                null, null, null, null,
                LocalDate.now().plusDays(1),
                LocalDate.now().plusDays(5),
                ServiceStatus.PENDING
        );

        mockMvc.perform(put("/api/boarding/999999")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(bookingDto)))
                .andExpect(status().isNotFound());
    }

    @Test
    void shouldDeleteBoardingBookingSuccessfully() throws Exception {
        // Create a booking to delete
        BoardingBooking booking = boardingBookingRepository.save(BoardingBooking.builder()
                .owner(savedOwner)
                .staff(savedStaff)
                .pet(savedPet)
                .room(savedRoom)
                .checkInDate(LocalDate.now().plusDays(1))
                .checkOutDate(LocalDate.now().plusDays(5))
                .status(ServiceStatus.PENDING)
                .notes("Booking to delete")
                .build());

        mockMvc.perform(delete("/api/boarding/" + booking.getBookingId()))
                .andExpect(status().isOk());

        // Verify booking is deleted
        mockMvc.perform(get("/api/boarding/" + booking.getBookingId()))
                .andExpect(status().isNotFound());
    }
}