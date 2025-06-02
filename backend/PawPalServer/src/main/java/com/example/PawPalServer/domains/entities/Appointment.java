package com.example.PawPalServer.domains.entities;

import com.example.PawPalServer.enums.AppointmentType;
import com.example.PawPalServer.enums.ServiceStatus;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "appointments")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer appointmentId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "pet_id", nullable = false)
    @ToString.Exclude
    private Pet pet;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "owner_id", nullable = false)
    @ToString.Exclude
    private User owner;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "veterinarian_id")
    @ToString.Exclude
    private User veterinarian;

    @Column(name = "appointment_date", nullable = false)
    private LocalDateTime appointmentDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "appointment_type", nullable = false)
    private AppointmentType appointmentType;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Builder.Default
    private ServiceStatus status = ServiceStatus.PENDING;

    @Column(columnDefinition = "TEXT")
    private String notes;

    @Column(name = "notes_from_client", columnDefinition = "TEXT")
    private String notesFromClient;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_appointment_id")
    @ToString.Exclude
    private Appointment parentAppointment;

}
