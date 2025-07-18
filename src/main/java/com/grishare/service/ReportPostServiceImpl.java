package com.grishare.service;

import com.grishare.domain.ReportPost;
import com.grishare.dto.ReportPostRequestDto;
import com.grishare.repository.PostRepository;
import com.grishare.repository.ReportPostRepository;
import com.grishare.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReportPostServiceImpl implements ReportPostService{

    @Autowired
    private ReportPostRepository reportPostRepository;

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public ReportPost save(Long postId, Long userId, ReportPostRequestDto reportPostRequestDto) {
            try {
//                System.out.println(userId+"two");
                List<ReportPost> reportPostList = reportPostRepository.findByPostIdAndUserId(postId, userId);
                if (reportPostList.isEmpty()) {
                    return reportPostRepository
                            .save(
                                    reportPostRequestDto.toEntity(postRepository.findById(postId).get(), userRepository.findById(userId).get())
                                    //                                reportPostRequestDto.toEntity(postRepository.findById(postId).get())
                            );
                } else {
                    reportCheck(postId);
                }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return null;
    }

    private void reportCheck(Long post_id) {
        if (reportPostRepository.countAllByPost_Id(post_id) >= 3) {
            postRepository.deleteById(post_id);
        }
    }
}
