package com.example.PawPalServer.repositories;

import com.example.PawPalServer.domains.entities.GroomingService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GroomingServiceRepository extends JpaRepository<GroomingService, Integer> {
}
