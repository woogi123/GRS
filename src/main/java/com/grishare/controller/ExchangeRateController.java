package com.grishare.controller;

import com.grishare.base.BaseResponse;
import com.grishare.dto.ExchangeRateReturnDto;
import com.grishare.service.ExchangeRateServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ExchangeRateController {

    @Autowired
    ExchangeRateServiceImpl exService;


    @GetMapping("/exchangeRate/{countryName}/{bank}")
    public BaseResponse<ExchangeRateReturnDto> getExchangeRate(@PathVariable("countryName") String countryName, @PathVariable("bank") String bank){
        ExchangeRateReturnDto exReturnDto = exService.findByCountryNameAndBank(countryName, bank);
        return BaseResponse.ok(exReturnDto);

    }

    @GetMapping("/exchangeRate")
    public BaseResponse<List<ExchangeRateReturnDto>> getExchangeRates(){
        List<ExchangeRateReturnDto> exReturnDtoList = exService.findAll();
        return BaseResponse.ok(exReturnDtoList);
    }
}
