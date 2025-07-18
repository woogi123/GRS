package com.grishare.handler;

import com.grishare.base.BaseResponse;
import com.grishare.exception.CustomBadRequestException;
import com.grishare.exception.CustomNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;


@RestControllerAdvice
public class CustomExceptionHandler {

    @ExceptionHandler(CustomNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public BaseResponse customNotFoundHandler(CustomNotFoundException e) {
        return BaseResponse.fail(e.getErrorCode());
    }

    @ExceptionHandler(CustomBadRequestException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public BaseResponse customBadRequestHandler(CustomBadRequestException e) {
        return BaseResponse.fail(e.getErrorCode());
    }
}