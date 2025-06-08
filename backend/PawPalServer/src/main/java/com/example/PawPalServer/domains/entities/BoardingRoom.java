package com.example.PawPalServer.domains.entities;

import com.example.PawPalServer.enums.RoomType;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "boarding_rooms")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class BoardingRoom {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer roomId;

    @Column(name = "room_number", unique = true, nullable = false, length = 20)
    private String roomNumber;

    @Enumerated(EnumType.STRING)
    @Column(name = "room_type")
    private RoomType roomType;

}
