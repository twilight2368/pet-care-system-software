package com.example.PawPalServer.services.interfaces;

import com.example.PawPalServer.domains.entities.BoardingBooking;
import com.example.PawPalServer.enums.ServiceStatus;

import java.util.List;
import java.util.Optional;

public interface BoardingBookingService {
    Optional<BoardingBooking> getBoardingBookingById(Integer id);
    BoardingBooking createBoardingBookingById(BoardingBooking boardingBooking);
    BoardingBooking updateBoardingBookingById(BoardingBooking boardingBooking);
    boolean isExist(Integer id);
    void delete(Integer id);

    List<BoardingBooking> getBoardingBookingByUserId(Integer userId);
    List<BoardingBooking> getBoardingBookingByStatus(ServiceStatus serviceStatus);
    List<BoardingBooking> getBoardingBookingHistory();
}
