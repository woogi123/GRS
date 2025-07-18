package com.grishare.dto;

import com.grishare.domain.Quote;
import lombok.Data;

@Data
public class QuoteReturnDto {

    public int meal;

    public int taxi;

    public int coffee;

    public int rice;

    public QuoteReturnDto(Quote quote) {
        this.meal = quote.getMeal();
        this.taxi = quote.getTaxi();
        this.coffee = quote.getCoffee();
        this.rice = quote.getRice();
    }
}
