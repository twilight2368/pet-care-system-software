package com.example.PawPalServer.domains.dtos.medical;

import com.example.PawPalServer.domains.dtos.pet.PetDto;
import com.example.PawPalServer.domains.dtos.user.UserDto;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
@Builder
public class MedicalRecordDto {
    private Integer recordId;
    private PetDto pet;
    private UserDto veterinarian;
    private LocalDate visitDate;
    private String diagnosis;
    private String prescription;
    private String vaccinationDetails;
    private String allergies;
    private String chronicDiseases;
}
