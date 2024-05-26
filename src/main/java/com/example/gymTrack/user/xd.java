package com.example.gymTrack.user;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class xd {

    @GetMapping("/xd")
    public ResponseEntity<String> xd(){
        return ResponseEntity.ok("s");
    }
}
