package com.example.PawPalServer.repositories;

import com.example.PawPalServer.domains.entities.User;
import com.example.PawPalServer.enums.UserRole;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByUsername(String username);

    Optional<User> findByUsernameOrEmail(String usernameOrEmail, String usernameOrEmail1);

    Page<User> findByRole(UserRole role, Pageable pageable);

    boolean existsByUsername(String username);

    boolean existsByEmail(String email);
}
