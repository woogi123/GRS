package com.grishare.service;

import com.grishare.domain.Nation;
import com.grishare.domain.Post;
import com.grishare.domain.user.CustomUserDetail;
import com.grishare.domain.user.User;
import com.grishare.dto.*;
import com.grishare.exception.CustomException;
import com.grishare.exception.CustomNotFoundException;
import com.grishare.exception.ErrorCode;
import com.grishare.repository.LikeNationRepository;
import com.grishare.repository.LikeRepository;
import com.grishare.repository.NationRepository;
import com.grishare.repository.PostRepository;
import lombok.RequiredArgsConstructor;

import lombok.extern.java.Log;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class PostServiceImpl implements PostService {

    private final PostRepository postRepository;
    private final NationRepository nationRepository;
    private final ImageService imageService;
    private final LikeService likeService;
    private final LikeRepository likeRepository;

    private final LikeNationRepository likeNationRepository;

    @Override
    @Transactional
    public PostReturnDto save(User user, Long nationId, PostRequestDto postRequestDto, MultipartFile imageFile) {
        Nation nation = nationRepository.findById(nationId).orElseThrow(() -> {
            throw new CustomNotFoundException(ErrorCode.NOT_FOUND);
        });

        System.out.println("파일 전달은 받음");
        Post post = postRequestDto.toEntity(user, nation);
        postRepository.save(post);

        imageService.savePostImage(post, imageFile);

        return new PostReturnDto(post);
    }

    @Override
    public List<PostReturnDto> findByNationId(Long nationId) {
        List<Post> postList = postRepository.findAllByNationId(nationId);
        return postList.stream().map(PostReturnDto::new).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public PostDetailReturnDto findByPostId(CustomUserDetail customUserDetail, Long id) {
        Post post = postRepository.findById(id).orElseThrow(() -> {
            throw new CustomNotFoundException(ErrorCode.NOT_FOUND);
        });
        likeService.checkLike(customUserDetail.getUser().getUserLoginId(), post.getId());
        boolean like = likeRepository.findByPostIdAndUserId(id, customUserDetail.getUser().getId()).isPresent();
        post.setView(post.getView() + 1);

        return new PostDetailReturnDto(post, new LikeReturnDto(post, like));
    }

    @Override
    @Transactional(readOnly = true)
    public List<PostReturnDto> findAll() {
        List<Post> posts = postRepository.findAll();

        List<PostReturnDto> postReturnDtoList =
                posts.stream().map(post -> new PostReturnDto(post))
                        .collect(Collectors.toList());
        return postReturnDtoList;
    }

    @Transactional
    @Override
    public PostReturnDto update(Long id, PostRequestDto postRequestDto) {
        try {
            Optional<Post> postData = postRepository.findById(id);
            if (postData.isPresent()) {
                Post _post = postData.get();
                _post.setTitle(postRequestDto.getTitle());
                _post.setContent(postRequestDto.getContent());
                return new PostReturnDto(_post);
            } else {
                return null;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return null;
    }

    @Override
    public void delete(Long id) {
        try {
            postRepository.deleteById(id);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public List<HotPostResponseDto> getHotPosts() {
        try {
            List<Object[]> posts = likeRepository.getPostLikesCount();

            List<HotPostResponseDto> hotPosts = new ArrayList<>();

            for (int i = 0; i < posts.size(); i++) {
                if (i == 3) {
                    break;
                }

                Long postId = Long.valueOf(posts.get(i)[0].toString());
                Integer likes = Integer.valueOf(posts.get(i)[1].toString());

                Optional<Post> post = postRepository.findById(postId);
                post.ifPresent(value -> hotPosts.add(new HotPostResponseDto(value.getId(),value.getTitle(), value.getContent(), likes)));
            }

            return hotPosts;

        } catch (Exception e) {
            throw new CustomNotFoundException(ErrorCode.NOT_FOUND);
        }
    }

    public NationInfoResponseDto getNationInfo(Long nation_id) {
        try {
            Nation nation = nationRepository.findById(nation_id).orElseThrow(() -> {
                throw new CustomNotFoundException(ErrorCode.NOT_FOUND);
            });

            Integer likes = likeNationRepository.countAllByNation_Id(nation_id);

            return new NationInfoResponseDto(nation.getCountryName() + " (" + nation.getCountryEnName()+")",
                    likes, nation.getNationImgUrl());
            } catch (Exception e) {
                throw new CustomException(ErrorCode.NOT_FOUND);
            }
        }
}
