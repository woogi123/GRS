package com.grishare.service;

import com.grishare.dto.NationReturnDto;

import java.util.List;

public interface NationService {
    public List<NationReturnDto> findAll();

}
