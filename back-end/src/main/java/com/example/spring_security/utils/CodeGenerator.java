package com.example.spring_security.utils;

public abstract class CodeGenerator {
    public abstract String getCode(long rowsCount);

    public String format(String prefix, long number, int length) {
        String num = String.valueOf(number);
        num = "0".repeat(Math.abs(length - num.length())) + num;
        return prefix + num;
    }
}
