package com.grishare.service;

import com.grishare.domain.LikePost;
import com.grishare.domain.Nation;
import com.grishare.domain.Post;
import com.grishare.domain.user.User;
import com.grishare.dto.NationReturnDto;
import com.grishare.dto.PostReturnDto;
import com.grishare.repository.LikeRepository;
import com.grishare.repository.NationRepository;
import com.grishare.repository.PostRepository;
import com.grishare.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LikeServiceImpl implements LikeService {

    private final LikeRepository likeRepository;
    private final UserRepository userRepository;
    private final PostRepository postRepository;


    @Override
    public void addLike(String userLoginId, Long postId){
        Post post = postRepository.findById(postId).orElse(null);
        User loginUSer = userRepository.findByUserLoginId(userLoginId).orElse(null);
        LikePost likePost = new LikePost(post,loginUSer);
        likeRepository.save(likePost);
        System.out.println("조아요아이디! = " + likePost.getId());
    }

    @Override
    public void deleteLike(String userLoginId, Long postId){
        User loginUser = userRepository.findByUserLoginId(userLoginId).orElse(null);
        LikePost likePost = likeRepository.findByPostIdAndUserId(postId,loginUser.getId())
                .orElseThrow(null);

        likeRepository.delete(likePost);
    }
    @Override
    public Boolean checkLike(String userLoginId, Long postId){
        User loginUser = userRepository.findByUserLoginId(userLoginId).orElse(null);
        return likeRepository.findByPostIdAndUserId(postId,loginUser.getId())
                .isPresent();
    }
    @Override
    public void updateOfLikePost(Long postId, User user){
        if(!checkLike(user.getUserLoginId(),postId)) {
            addLike(user.getUserLoginId(), postId);

        }else {
            deleteLike(user.getUserLoginId(), postId);
        }
    }

}
