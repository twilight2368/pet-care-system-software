package com.example.PawPalServer.services.implement;

import com.example.PawPalServer.domains.entities.BoardingBooking;
import com.example.PawPalServer.enums.ServiceStatus;
import com.example.PawPalServer.repositories.BoardingBookingRepository;
import com.example.PawPalServer.services.interfaces.BoardingBookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BoardingBookingServiceImpl implements BoardingBookingService {

    @Autowired
    private BoardingBookingRepository boardingBookingRepository;

    @Override
    public Optional<BoardingBooking> getBoardingBookingById(Integer id) {
        return boardingBookingRepository.findById(id);
    }

    @Override
    public BoardingBooking createBoardingBookingById(BoardingBooking boardingBooking) {
        return boardingBookingRepository.save(boardingBooking);
    }

    @Override
    public BoardingBooking updateBoardingBookingById(BoardingBooking boardingBooking) {
        return boardingBookingRepository.save(boardingBooking);
    }

    @Override
    public boolean isExist(Integer id) {
        return boardingBookingRepository.existsById(id);
    }

    @Override
    public void delete(Integer id) {
        boardingBookingRepository.deleteById(id);
    }

    @Override
    public List<BoardingBooking> getBoardingBookingByUserId(Integer userId) {
        return  boardingBookingRepository.findByOwner_UserId(userId);
    }

    @Override
    public List<BoardingBooking> getBoardingBookingByStatus(ServiceStatus serviceStatus) {
        return boardingBookingRepository.findByStatus(serviceStatus);
    }

    @Override
    public List<BoardingBooking> getBoardingBookingHistory() {
        return boardingBookingRepository.findByStatusNot(ServiceStatus.PENDING);
    }
}
