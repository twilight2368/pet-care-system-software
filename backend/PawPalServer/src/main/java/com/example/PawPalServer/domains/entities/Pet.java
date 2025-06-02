package com.example.PawPalServer.domains.entities;

import com.example.PawPalServer.enums.PetGender;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Table(name = "pets")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Pet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer petId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "owner_id", nullable = false)
    @ToString.Exclude
    private User owner;

    @Column(nullable = false, length = 50)
    private String name;

    private Integer age;

    @Enumerated(EnumType.STRING)
    private PetGender gender;

    @Column(length = 50)
    private String breed;

    @Column(length = 30)
    private String color;

    @Column(length = 255)
    private String photoUrl;

    @Column(precision = 5, scale = 2)
    private BigDecimal weightKg;

    @Column(precision = 5, scale = 2)
    private BigDecimal heightCm;

    @Column(columnDefinition = "TEXT")
    private String bloodType;

    @Builder.Default
    private Boolean spayedNeutered = false;

    @Builder.Default
    private Boolean microchipped = false;

    @Builder.Default
    private Boolean isAlert = false;

    @Column(columnDefinition = "TEXT")
    private String healthNotes;

}
