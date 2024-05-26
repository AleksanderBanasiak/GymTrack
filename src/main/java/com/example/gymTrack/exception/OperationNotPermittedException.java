package com.example.gymTrack.exception;

public class OperationNotPermittedException extends RuntimeException {
    public OperationNotPermittedException(String s){
        super(s);
    }
}
