package com.grishare.service;

import com.grishare.domain.Nation;
import com.grishare.dto.NationReturnDto;
import com.grishare.dto.NationWarningReturnDto;
import com.grishare.exception.CustomException;
import com.grishare.exception.ErrorCode;
import com.grishare.repository.NationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class NationServiceImpl implements NationService{

    @Autowired
    private NationRepository nationRepository;

    @Override
    public List<NationReturnDto> findAll() {
        List<Nation> nationList = nationRepository.findAll();
        List<NationReturnDto> nationReturnDtoList = new ArrayList<>();
        return nationList.stream().map(NationReturnDto::new).collect(Collectors.toList());
    }

    public NationWarningReturnDto getWarning(String nationCode) {
        List<Nation> nations = nationRepository.findByIso2(nationCode);
        if (!nations.isEmpty()) {
            return new NationWarningReturnDto(nations.get(0));
        } else throw new CustomException(ErrorCode.NOT_FOUND);
    }
}
