package com.grishare.service;

import com.grishare.base.BaseResponse;
import com.grishare.domain.AdministrativeDivision;
import com.grishare.domain.Nation;
import com.grishare.domain.Quote;
import com.grishare.dto.QuoteADReturnDto;
import com.grishare.dto.QuoteNationReturnDto;
import com.grishare.dto.QuoteReturnDto;
import com.grishare.exception.CustomException;
import com.grishare.exception.ErrorCode;
import com.grishare.repository.AdministrativeDivisionRepository;
import com.grishare.repository.NationRepository;
import com.grishare.repository.QuoteRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@Service
public class QuoteServiceImpl implements QuoteService {

    @Autowired
    private QuoteRepository quoteRepository;

    @Autowired
    private NationRepository nationRepository;

    @Autowired
    private AdministrativeDivisionRepository administrativeDivisionRepository;

    public BaseResponse<?> getCountry() {
        List<Nation> nationList = nationRepository.findAll();
        List<QuoteNationReturnDto> quoteNationReturnDtoList = nationList.stream()
                .map(nation -> new QuoteNationReturnDto(nation.getId(), nation.getCountryName()))
                .toList();
        return BaseResponse.ok(quoteNationReturnDtoList);
    }

    public BaseResponse<?> getDivision(Long nationId) {
        try {
            List<AdministrativeDivision> adList = administrativeDivisionRepository.findAllByNation_Id(nationId);
            if (!adList.isEmpty()) {
                List<QuoteADReturnDto> adReturnDtoList = adList.stream()
                        .map(administrativeDivision -> new QuoteADReturnDto
                                (administrativeDivision.getId(), administrativeDivision.getAdName())).toList();
                return BaseResponse.ok(adReturnDtoList);
            } else return BaseResponse.fail(ErrorCode.NOT_FOUND);
        } catch (Exception e) {
            throw new CustomException(ErrorCode.BAD_REQUEST);
        }
    }

    public QuoteReturnDto getQuote(Long ad_id) {
        try {
            Optional<Quote> quote = quoteRepository.findById(ad_id);
            if (quote.isPresent()) {
                return new QuoteReturnDto(quote.get());
            } else throw new CustomException(ErrorCode.NOT_FOUND);
        } catch (Exception e) {
            throw new CustomException(ErrorCode.BAD_REQUEST);
        }
    }

}
