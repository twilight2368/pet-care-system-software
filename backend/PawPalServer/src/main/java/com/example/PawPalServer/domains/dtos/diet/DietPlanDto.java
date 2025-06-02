package com.example.PawPalServer.domains.dtos.diet;

import com.example.PawPalServer.domains.dtos.pet.PetDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DietPlanDto {
    private Integer dietId;
    private PetDto pet;
    private String dietDetails;
    private LocalDate startDate;
    private LocalDate endDate;
}
