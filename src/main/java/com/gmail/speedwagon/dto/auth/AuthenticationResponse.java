package com.gmail.speedwagon.dto.auth;

import com.gmail.speedwagon.dto.user.UserResponse;
import lombok.Data;

@Data
public class AuthenticationResponse {
    private UserResponse user;
    private String token;
}
