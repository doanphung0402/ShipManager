package com.example.spring_security.error;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class NotEnoughException extends RuntimeException{
    public NotEnoughException(String message) { super(message);}
}
