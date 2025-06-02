package com.example.PawPalServer.utils;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

public class BcryptUtils {
    private static final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    // Hash (encode) the plain password
    public static String hashPassword(String plainPassword) {
        return passwordEncoder.encode(plainPassword);
    }

    // Verify plain password against hashed password
    public static boolean verifyPassword(String plainPassword, String hashedPassword) {
        return passwordEncoder.matches(plainPassword, hashedPassword);
    }
}
