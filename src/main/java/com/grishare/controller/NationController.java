package com.grishare.controller;

import com.grishare.base.BaseResponse;
import com.grishare.dto.NationReturnDto;
import com.grishare.service.NationServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class NationController {

    @Autowired
    NationServiceImpl nationService;

    @GetMapping("/exchangeRate/country")
    public BaseResponse<List<NationReturnDto>> getNations() {
        List<NationReturnDto> nationReturnDtoList = nationService.findAll();
        return BaseResponse.ok(nationReturnDtoList);
    }

    @GetMapping("/nation/{nationCode}")
    public BaseResponse<?> getNationWarning(@PathVariable("nationCode") String nationCode) {
        return BaseResponse.ok(nationService.getWarning(nationCode));
    }
}
