package com.example.PawPalServer.services.interfaces;

import com.example.PawPalServer.domains.entities.User;
import com.example.PawPalServer.enums.UserRole;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface UserService {
    User createUser(User newUser);
    Page<User> getUser(Pageable pageable);
    List<User> getUser();
    Optional<User> getUser(Integer id);
    boolean isExistsByUsernameOrEmail(String username, String email);
    User updateUser(User updateUser);
    List<User> getUserByRole(UserRole role);
    boolean isExists(Integer id);
    void delete(Integer id);
}
