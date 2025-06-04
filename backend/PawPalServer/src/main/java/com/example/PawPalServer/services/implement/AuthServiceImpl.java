package com.example.PawPalServer.services.implement;

import com.example.PawPalServer.domains.dtos.auth.JwtTokenDto;
import com.example.PawPalServer.domains.dtos.auth.LoginRequest;
import com.example.PawPalServer.domains.dtos.auth.LoginResponse;
import com.example.PawPalServer.domains.dtos.user.UserDto;
import com.example.PawPalServer.domains.entities.User;
import com.example.PawPalServer.mappers.interfaces.Mapper;
import com.example.PawPalServer.repositories.UserRepository;
import com.example.PawPalServer.services.interfaces.AuthService;
import com.example.PawPalServer.utils.BcryptUtils;
import com.example.PawPalServer.utils.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private Mapper<UserDto, User> userMapper;

    @Override
    public Optional<LoginResponse> login(LoginRequest loginRequest) {
        String usernameOrEmail = loginRequest.getUsername();
        String rawPassword = loginRequest.getPassword();

        Optional<User> userOpt = userRepository
                .findByUsernameOrEmail(usernameOrEmail, usernameOrEmail);

        if (userOpt.isPresent()) {
             if(BcryptUtils.verifyPassword(rawPassword, userOpt.get().getPasswordHash())){
                 User user = userOpt.get();

                 String token = jwtUtils.generateJwtToken(user.getUsername());
                 return Optional.of(LoginResponse.builder()
                         .user(userMapper.mapToDto(user))
                         .jwt(JwtTokenDto.builder().token(token).build())
                         .build());
             }
        }

        return Optional.empty();
    }
}
