package com.example.gymTrack.service;

import com.example.gymTrack.domain.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {


    public String getUserName(Authentication authUser) {
        User user = (User) authUser.getPrincipal();
        return user.getName();
    }
}
