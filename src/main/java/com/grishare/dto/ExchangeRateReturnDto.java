package com.grishare.dto;

import com.grishare.domain.ExchangeRate;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ExchangeRateReturnDto {

    private String countryName;

    private Float exchangeRate;

    private String curUnit;

    public ExchangeRateReturnDto(ExchangeRate ex){

        this.countryName = ex.getCountryName();
        this.exchangeRate = ex.getExchangeRate();
        this.curUnit = ex.getCurUnit();
    }
}
