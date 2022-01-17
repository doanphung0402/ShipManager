package com.example.spring_security.utils;
import org.springframework.stereotype.Component;

@Component
public class CustomerCodeGenerator extends CodeGenerator{
    private final String prefix = "KH";
    private final int length = 4;

    @Override
    public String getCode(long rowsCount) {
        return super.format(prefix,rowsCount+1,length);
    }
}
