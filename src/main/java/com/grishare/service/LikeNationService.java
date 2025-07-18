package com.grishare.service;

import com.grishare.domain.user.User;
import com.grishare.dto.NationReturnDto;

import java.util.List;

public interface LikeNationService {
    public void addLike(String userLoginId, Long postId);

    public Boolean checkLike(String userLoginId, Long postId);

    public void deleteLike(String userLoginId, Long postId);
    public void updateOfLikeNation(final Long postId, final User user);
    public List<NationReturnDto> findByUserId(Long userId);
}
