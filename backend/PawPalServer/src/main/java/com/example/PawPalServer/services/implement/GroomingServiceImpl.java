package com.example.PawPalServer.services.implement;

import com.example.PawPalServer.domains.entities.GroomingService;
import com.example.PawPalServer.enums.GroomingServiceType;
import com.example.PawPalServer.enums.RecurrencePattern;
import com.example.PawPalServer.enums.ServiceStatus;
import com.example.PawPalServer.repositories.GroomingServiceRepository;
import com.example.PawPalServer.services.interfaces.GroomingServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class GroomingServiceImpl implements GroomingServiceInterface {

    @Autowired
    private GroomingServiceRepository groomingServiceRepository;

    @Override
    public List<GroomingService> getGroomingBookingByDate(LocalDateTime startOfDay, LocalDateTime endOfDay) {
        return groomingServiceRepository.findByServiceDateBetween(startOfDay, endOfDay);
    }

    @Override
    public List<GroomingService> getGroomingBookingByType(GroomingServiceType groomingServiceType) {
        return groomingServiceRepository.findByServiceType(groomingServiceType);
    }

    @Override
    public Page<GroomingService> getGroomingBookingHistory(Pageable pageable) {
        return groomingServiceRepository.findByStatusNot(ServiceStatus.PENDING, pageable);
    }

    @Override
    public List<GroomingService> getNewGroomingBooking() {
        return groomingServiceRepository.findByStatus(ServiceStatus.PENDING);
    }

    @Override
    public Page<GroomingService> getPeriodGroomingBooking(RecurrencePattern recurrencePattern ,Pageable pageable) {
        return groomingServiceRepository.findByRecurrencePattern(recurrencePattern, pageable);
    }

    @Override
    public List<GroomingService> getGroomingByUser(Integer userId) {
        return groomingServiceRepository.findByOwner_UserId(userId);
    }

    @Override
    public Optional<GroomingService> getGroomingService(Integer id) {
        return groomingServiceRepository.findById(id);
    }

    @Override
    public GroomingService createGroomingService(GroomingService groomingService) {
        return groomingServiceRepository.save(groomingService);
    }

    @Override
    public GroomingService updateGroomingService(GroomingService groomingService) {
        return groomingServiceRepository.save(groomingService);
    }

    @Override
    public boolean isExist(Integer id) {
        return groomingServiceRepository.existsById(id);
    }

    @Override
    public void delete(Integer id) {
        groomingServiceRepository.deleteById(id);
    }
}
