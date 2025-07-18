package com.grishare.service;

import com.grishare.bankapi.EcaApi;
import com.grishare.domain.Bank;
import com.grishare.domain.ExchangeRate;
import com.grishare.domain.Nation;
import com.grishare.dto.ExchangeRateRequestDto;
import com.grishare.dto.ExchangeRateReturnDto;
import com.grishare.repository.ExchangeRateRepository;
import com.grishare.repository.NationRepository;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.Currency;

@Service
@Transactional
public class ExchangeRateServiceImpl implements ExchangeRateService{

    @Autowired
    private ExchangeRateRepository exRepository;

    @Autowired
    private EcaApi ecaApi;

    @Autowired
    private NationRepository nationRepository;

    @Override
    public ExchangeRate save(ExchangeRateRequestDto exRequestDto) {
        try{
            return  exRepository
                    .save(
                            exRequestDto.toEntity()
                    );
        } catch (Exception e){
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public void update() throws IOException {
        JSONArray jsonArray = ecaApi.getApi();
        if(jsonArray != null) {
            List<ExchangeRate> exList = new ArrayList<>();
            for (int i = 0; i < jsonArray.length(); i++) {
                JSONObject jsonObject = (JSONObject) jsonArray.get(i);
                String curUnit = jsonObject.getString("cur_unit");
                String contryName = curUnit.substring(0, 2);
                String deal_bas_r = jsonObject.getString("deal_bas_r");
                Float rate = Float.parseFloat(deal_bas_r.replaceAll(",", ""));
                if(curUnit.substring(curUnit.length()-1) == ")"){
                    rate /= Float.parseFloat(curUnit.substring(curUnit.length()-3, curUnit.length()-2));
                }
                ExchangeRate exchangeRate = ExchangeRate.builder()
                        .bank(Bank.ECA)
                        .countryCode(contryName)
                        .curUnit((curUnit))
                        .exchangeRate(1000 / rate)
                        .build();
                exList.add(exchangeRate);
            }
            //for문 (데이터 유무 구분)
            for (int i = 0; i < exList.size(); i++) {
                List<Nation> nationList = nationRepository.findByIso2(exList.get(i).getCountryCode());
                if (!nationList.isEmpty()) {
                    List<ExchangeRate> erList = exRepository.findByCountryNameAndBank(nationList.get(0).getCountryName(), exList.get(i).getBank());
                    ExchangeRate ex = exList.get(i);
                    ex.setCountryName(nationList.get(0).getCountryName());
                    if (!erList.isEmpty()) {
                        ExchangeRate er = erList.get(0);
                        er.setExchangeRate(ex.getExchangeRate());
                        er.setNation(nationList.get(0));
                        ResponseEntity
                                .status(HttpStatus.ACCEPTED)
                                .body(er);
                    } else {
                        ex.setNation(nationList.get(0));
                        exRepository.save(ex);
                    }
                }
            }
        }
    }

    @Override
    public List<ExchangeRateReturnDto> findAll() {
        List<ExchangeRate> exList = exRepository.findAll();
        List<ExchangeRateReturnDto> exReturnDtoList = new ArrayList<>();
        return exList.stream().map(ExchangeRateReturnDto::new).collect(Collectors.toList());
    }

    @Override
    public ExchangeRateReturnDto findByCountryNameAndBank(String countryName, String bank) {
        List<ExchangeRate> ex = exRepository.findByCountryNameAndBank(countryName, Bank.valueOf(bank));
        if(!ex.isEmpty()){
            return new ExchangeRateReturnDto(ex.get(0));
        }
        return null;
    }
}
