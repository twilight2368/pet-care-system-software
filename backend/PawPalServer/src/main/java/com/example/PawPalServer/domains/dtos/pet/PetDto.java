package com.example.PawPalServer.domains.dtos.pet;

import com.example.PawPalServer.domains.dtos.user.UserDto;
import com.example.PawPalServer.enums.PetGender;
import lombok.*;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PetDto {
    private Integer petId;
    private UserDto owner;
    private String name;
    private Integer age;
    private PetGender gender;
    private String breed;
    private String color;
    private String photoUrl;
    private BigDecimal weightKg;
    private BigDecimal heightCm;
    private String bloodType;
    private Boolean spayedNeutered;
    private Boolean microchipped;
    private Boolean isAlert;
    private String healthNotes;
}
