package com.example.PawPalServer.domains.entities;

import com.example.PawPalServer.enums.GroomingServiceType;
import com.example.PawPalServer.enums.RecurrencePattern;
import com.example.PawPalServer.enums.ServiceStatus;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "grooming_services")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class GroomingService {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer groomingId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "pet_id", nullable = false)
    @ToString.Exclude
    private Pet pet;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "owner_id", nullable = false)
    @ToString.Exclude
    private User owner;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "staff_id")
    @ToString.Exclude
    private User staff;

    @Column(name = "service_date", nullable = false)
    private LocalDateTime serviceDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "service_type", nullable = false)
    private GroomingServiceType serviceType;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Builder.Default
    private ServiceStatus status = ServiceStatus.PENDING;

    @Column(columnDefinition = "TEXT")
    private String notes;

    @Column(name = "notes_from_client", columnDefinition = "TEXT")
    private String notesFromClient;

    @Enumerated(EnumType.STRING)
    @Column(name = "recurrence_pattern")
    private RecurrencePattern recurrencePattern;

}

