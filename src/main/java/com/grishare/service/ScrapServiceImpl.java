package com.grishare.service;

import com.grishare.domain.Post;
import com.grishare.domain.Scrap;
import com.grishare.domain.user.User;
import com.grishare.repository.PostRepository;
import com.grishare.repository.ScrapRepository;
import com.grishare.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ScrapServiceImpl implements ScrapService{

    private final ScrapRepository scrapRepository;
    private final UserRepository userRepository;
    private final PostRepository postRepository;

    @Override
    @Transactional
    public void addScrap(String userLoginId, Long postId){
        Post post = postRepository.findById(postId).orElse(null);
        User loginUSer = userRepository.findByUserLoginId(userLoginId).orElse(null);
        Scrap scrap = new Scrap(post,loginUSer); // 문제 부분
        scrapRepository.save(scrap);
        System.out.println("스크랩아이디 = " + scrap.getId());

    }

    @Override
    @Transactional
    public void deleteScrap(String userLoginId, Long postId){
        User loginUser = userRepository.findByUserLoginId(userLoginId).orElse(null);
        Scrap scrap = scrapRepository.findByPostIdAndUserId(postId,loginUser.getId())
                        .orElseThrow(null);

        scrapRepository.delete(scrap);
    }
    @Override
    public Boolean checkScrap(String userLoginId, Long postId){

        User loginUser = userRepository.findByUserLoginId(userLoginId).orElse(null);
        return scrapRepository.findByPostIdAndUserId(postId,loginUser.getId())
                .isPresent();
    }
    @Override
    public void updateOfScrapPost(Long postId, User user){

        if(!checkScrap(user.getUserLoginId(),postId)) {
            addScrap(user.getUserLoginId(), postId);
        }else if(checkScrap(user.getUserLoginId(),postId)){
            deleteScrap(user.getUserLoginId(), postId);
        }
    }
}
