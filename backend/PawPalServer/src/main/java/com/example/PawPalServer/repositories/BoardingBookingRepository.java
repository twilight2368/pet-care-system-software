package com.example.PawPalServer.repositories;

import com.example.PawPalServer.domains.entities.BoardingBooking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BoardingBookingRepository extends JpaRepository<BoardingBooking, Integer> {
}
