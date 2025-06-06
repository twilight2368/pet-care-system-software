package com.example.PawPalServer.repositories;

import com.example.PawPalServer.domains.entities.BoardingBooking;
import com.example.PawPalServer.enums.ServiceStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BoardingBookingRepository extends JpaRepository<BoardingBooking, Integer> {
    List<BoardingBooking> findByStatus(ServiceStatus serviceStatus);

    List<BoardingBooking> findByStatusNot(ServiceStatus serviceStatus);
}
