package com.example.PawPalServer.services.implement;

import com.example.PawPalServer.domains.entities.User;
import com.example.PawPalServer.enums.UserRole;
import com.example.PawPalServer.repositories.UserRepository;
import com.example.PawPalServer.services.interfaces.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public User createUser(User newUser) {
        return userRepository.save(newUser);
    }

    @Override
    public Page<User> getUser(Pageable pageable) {
        return userRepository.findAll(pageable);
    }

    @Override
    public List<User> getUser() {
        return userRepository.findAll();
    }

    @Override
    public Optional<User> getUser(Integer id) {
        return userRepository.findById(id);
    }

    @Override
    public boolean isExistsByUsernameOrEmail(String username, String email) {
        return userRepository.existsByUsername(username) || userRepository.existsByEmail(email);
    }

    @Override
    public User updateUser(User updateUser) {
        User existingUser = userRepository.findById(updateUser.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        existingUser.setUsername(updateUser.getUsername());
        existingUser.setEmail(updateUser.getEmail());
        existingUser.setPhone(updateUser.getPhone());
        existingUser.setFullName(updateUser.getFullName());
        existingUser.setRole(updateUser.getRole());
        existingUser.setSpecialization(updateUser.getSpecialization());
        existingUser.setIsLock(updateUser.getIsLock());

        return userRepository.save(existingUser);
    }

    @Override
    public List<User> getUserByRole(UserRole role) {
        return userRepository.findByRole(role);
    }

    @Override
    public boolean isExists(Integer id) {
        return userRepository.existsById(id);
    }

    @Override
    public void delete(Integer id) {
        userRepository.deleteById(id);
    }
}
