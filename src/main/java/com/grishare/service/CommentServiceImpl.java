package com.grishare.service;

import com.grishare.domain.Comment;
import com.grishare.domain.Post;
import com.grishare.domain.user.User;
import com.grishare.dto.CommentRequestDto;
import com.grishare.dto.CommentReturnDto;
import com.grishare.dto.PostReturnDto;
import com.grishare.repository.CommentRepository;
import com.grishare.repository.PostRepository;
import com.grishare.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService{

    private final CommentRepository commentRepository;
    private final PostRepository postRepository;
    private final UserRepository userRepository;

    @Override
    public Comment createComment(CommentRequestDto commentRequestDto){
        Post post = postRepository.findById(commentRequestDto.getPostId()).orElse(null);

        Comment comment = Comment.builder()
                .post(post)
                .user(commentRequestDto.getWriter())
                .content(commentRequestDto.getContent())
                .build();

        return commentRepository.save(comment);
    }

    @Override
    public List<CommentReturnDto> getComments(Long postId, Long userId){
        List<Comment> comments = commentRepository.findAllByPostId(postId);
        Post post = postRepository.findById(postId).orElse(null);


        List<CommentReturnDto> commentReturnDtoList =
                comments.stream().map(comment -> new CommentReturnDto(comment))
                        .collect(Collectors.toList());
        return commentReturnDtoList;
    }

}
