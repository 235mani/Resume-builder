package com.resumebuilder.service;

import com.resumebuilder.dto.AuthResponse;
import com.resumebuilder.dto.LoginRequest;
import com.resumebuilder.dto.RegisterRequest;

public interface AuthService {

    AuthResponse register(RegisterRequest request);

    AuthResponse login(LoginRequest request);

}