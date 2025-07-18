package com.grishare.service;

import com.grishare.base.BaseResponse;
import com.grishare.dto.QuoteReturnDto;

public interface QuoteService {

    public BaseResponse<?> getCountry();

    public BaseResponse<?> getDivision(Long nationId);

    public QuoteReturnDto getQuote(Long ad_id);
}
