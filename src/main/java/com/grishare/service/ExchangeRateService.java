package com.grishare.service;

import com.grishare.domain.ExchangeRate;
import com.grishare.dto.ExchangeRateRequestDto;
import com.grishare.dto.ExchangeRateReturnDto;

import java.io.IOException;
import java.util.List;

public interface ExchangeRateService {

    public ExchangeRate save(ExchangeRateRequestDto exRequestDto);
    public void update() throws IOException;
    public List<ExchangeRateReturnDto> findAll();
    public ExchangeRateReturnDto findByCountryNameAndBank(String countryName, String bank);

}
