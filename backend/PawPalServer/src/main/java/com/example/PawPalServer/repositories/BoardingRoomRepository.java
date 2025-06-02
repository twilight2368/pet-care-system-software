package com.example.PawPalServer.repositories;

import com.example.PawPalServer.domains.entities.BoardingRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BoardingRoomRepository extends JpaRepository<BoardingRoom, Integer> {}
