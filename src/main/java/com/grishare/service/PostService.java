package com.grishare.service;

import com.grishare.domain.user.CustomUserDetail;
import com.grishare.domain.user.User;
import com.grishare.dto.*;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface PostService {

//    public PostReturnDto findById(Long postId);
    PostReturnDto save(User user, Long nationId, PostRequestDto postRequestDto, MultipartFile imageFile);

    List<PostReturnDto> findByNationId(Long nationID);

    PostDetailReturnDto findByPostId(CustomUserDetail customUserDetail, Long id);

    public List<PostReturnDto> findAll();
    public PostReturnDto update(Long id, PostRequestDto postRequestDto);
    public void delete(Long id);


}
