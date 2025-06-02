package com.example.PawPalServer.security;

import com.example.PawPalServer.utils.BcryptUtils;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class CustomPasswordEncoder implements PasswordEncoder {

    @Override
    public String encode(CharSequence rawPassword) {
        return BcryptUtils.hashPassword(rawPassword.toString());
    }

    @Override
    public boolean matches(CharSequence rawPassword, String encodedPassword) {
        return BcryptUtils.verifyPassword(rawPassword.toString(), encodedPassword);
    }
}
