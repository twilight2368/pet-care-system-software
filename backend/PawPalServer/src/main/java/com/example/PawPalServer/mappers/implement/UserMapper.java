package com.example.PawPalServer.mappers.implement;

import com.example.PawPalServer.domains.dtos.user.UserDto;
import com.example.PawPalServer.domains.entities.User;
import com.example.PawPalServer.mappers.interfaces.Mapper;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class UserMapper implements Mapper<UserDto, User> {

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public UserDto mapToDto(User user) {
        return modelMapper.map(user, UserDto.class);
    }

    @Override
    public User mapToEntity(UserDto userDto) {
        return modelMapper.map(userDto, User.class);
    }
}
