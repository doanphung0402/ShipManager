package com.example.spring_security.utils;

import org.springframework.stereotype.Component;

@Component
public class OrderCodeGenerator extends CodeGenerator {
    private final String prefix = "OR";
    private final int length = 5;

    @Override
    public String getCode(long rowsCount) {
        return super.format(prefix,rowsCount+1,length);
    }
}
