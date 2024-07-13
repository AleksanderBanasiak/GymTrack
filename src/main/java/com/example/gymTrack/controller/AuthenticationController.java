package com.example.gymTrack.controller;


import com.example.gymTrack.domain.dto.request.AuthRequest;
import com.example.gymTrack.domain.dto.response.AuthResponse;
import com.example.gymTrack.service.AuthenticationService;
import com.example.gymTrack.domain.dto.request.RegistrationRequest;
import jakarta.mail.MessagingException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("auth")
public class AuthenticationController {

    private final AuthenticationService authenticationService;


    @PostMapping("/register")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public ResponseEntity<?> register(@RequestBody @Valid RegistrationRequest request) throws MessagingException {
        authenticationService.register(request);
        return ResponseEntity.accepted().build();
    }


    @PostMapping("/authenticate")
    public ResponseEntity<AuthResponse> authenticate(@RequestBody @Valid AuthRequest authRequest){
        return ResponseEntity.ok(authenticationService.authenticate(authRequest));
    }

    @GetMapping("/activate-account")
    public void activateAccount(@RequestParam String token) throws MessagingException {
        authenticationService.activate(token);
    }



}
