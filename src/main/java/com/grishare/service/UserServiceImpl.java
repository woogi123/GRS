package com.grishare.service;

import com.grishare.domain.Post;
import com.grishare.domain.image.BackImage;
import com.grishare.domain.image.UserImage;
import com.grishare.domain.user.CustomUserDetail;
import com.grishare.domain.user.User;
import com.grishare.dto.*;
import com.grishare.repository.PostRepository;
import com.grishare.repository.ScrapRepository;
import com.grishare.repository.UserRepository;
import com.grishare.repository.image.ImageRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Lazy;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
public class UserServiceImpl implements UserDetailsService , UserService {

    private final UserRepository userRepository;
    private final PostRepository postRepository;
    private final ScrapRepository scrapRepository;
    private final PasswordEncoder passwordEncoder;
    private final ImageService imageService;
    private final ImageRepository imageRepository;

    private final JavaMailSender javaMailSender;


    public UserServiceImpl(@Lazy UserRepository userRepository,
                           @Lazy PasswordEncoder passwordEncoder,
                           @Lazy ScrapRepository scrapRepository,
                           @Lazy JavaMailSender javaMailSender,
                           @Lazy PostRepository postRepository,
                           ImageService imageService,
                           ImageRepository imageRepository){
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.javaMailSender = javaMailSender;
        this.postRepository = postRepository;
        this.scrapRepository = scrapRepository;
        this.imageService = imageService;
        this.imageRepository = imageRepository;
    }


    // spring security 관련 UserDetailsService implement 부분
    @Override
    public UserDetails loadUserByUsername(String userId) throws UsernameNotFoundException {
        User user = userRepository.findByUserLoginId(userId).orElse(null);

        if (user == null){
            throw new UsernameNotFoundException("UsernameNotFoundException");
        }

        return new CustomUserDetail(user);

    }
    // 회원가입
    @Override
    @Transactional
    public UserReturnDto saveUser(RegisterRequestDto registerRequestDto){
        User user = User.builder()
                .userLoginId(registerRequestDto.getUserLoginId())
                .userName(registerRequestDto.getUserName())
                .email(registerRequestDto.getEmail())
                .password(registerRequestDto.getPassword())
                .userLoginId(registerRequestDto.getUserLoginId())
                .birthDay(registerRequestDto.getBirthDay())
                .nickName(registerRequestDto.getNickName())
                .build();

        userRepository.save(user);

        List<String> userStandardImg = new ArrayList<>();
        userStandardImg.add("https://elasticbeanstalk-ap-northeast-2-670982426569.s3.ap-northeast-2.amazonaws.com/post/276_ffa18c5c-d1a3-448c-b2f2-7673cee2c591_%E1%84%91%E1%85%B3%E1%84%89%E1%85%A11.jpeg");
        userStandardImg.add("https://elasticbeanstalk-ap-northeast-2-670982426569.s3.ap-northeast-2.amazonaws.com/post/277_1b03f247-c813-43b3-8e0b-4fec02e32b3e_%E1%84%91%E1%85%B3%E1%84%89%E1%85%A12.jpeg");
        userStandardImg.add("https://elasticbeanstalk-ap-northeast-2-670982426569.s3.ap-northeast-2.amazonaws.com/post/278_ebdac035-5cda-46d8-929c-a7c20bb5e279_images.jpeg");

        double randomValue = Math.random(); // 0.0 이상 1.0 미만의 랜덤 실수 반환
        int randomNumber = (int) (randomValue * 3);


        UserImage userImage = new UserImage(user, userStandardImg.get(randomNumber));

        List<String> userStandardBackImg = new ArrayList<>();
        userStandardBackImg.add("https://elasticbeanstalk-ap-northeast-2-670982426569.s3.ap-northeast-2.amazonaws.com/post/299_de58ea3d-913a-4abe-80ec-94b1a56d6584_back4.jpeg");
        userStandardBackImg.add("https://elasticbeanstalk-ap-northeast-2-670982426569.s3.ap-northeast-2.amazonaws.com/post/280_4d8a2bd5-132e-493b-9322-38bd62e32e95_back2.jpeg");
        userStandardBackImg.add("https://elasticbeanstalk-ap-northeast-2-670982426569.s3.ap-northeast-2.amazonaws.com/post/281_4d503de2-7753-474d-94e7-5f0530e69728_back3.jpeg");

        randomValue = Math.random();
        randomNumber = (int) (randomValue * 3);

        BackImage backImage = new BackImage(user, userStandardBackImg.get(randomNumber));

        imageRepository.save(userImage);
        imageRepository.save(backImage);

        user.setUserImg(userImage);
        user.setBackgroundImg(backImage);

        return new UserReturnDto(user);
    }

    // 회원정보 가져오기
    // 기본 정보 + 관심국가 + 내가 쓴 리뷰(부분) + 스크랩 게시물(부분)
    @Override
    @Transactional
    public UserReturnDto getUser(User user){
        return new UserReturnDto(user);
    }
    // 회원정보 수정 -> 이미지 어떻게 할 것인가.
    @Override
    @Transactional
    public User updateUser(User user, UserRequestDto userRequestDto){

        if(isValid(userRequestDto.getNickName())) {
            user.setNickName(userRequestDto.getNickName());
        }
        if (isValid(userRequestDto.getUserLoginId())) {
            user.setUserLoginId(userRequestDto.getUserLoginId());
        }
        if(isValid(userRequestDto.getPassword())) {
            String encryptPassword = passwordEncoder.encode(userRequestDto.getPassword());
            user.updatePassword(encryptPassword);
        }

        userRepository.save(user);
        return user;
    }
//    public String getCategory(Long postId){
//        Post post = postRepository.findById(postId).get();
////        return post.getCategory().toString().toLowerCase();
//    }
    // 내가 쓴 리뷰 전체 조회
    @Override
    public List<PostReturnDto.naitonInfo> getMyPost(Long userId){ // userId에 로그인한 회원 Pk가 들어가야 됨

       List<Post> myPosts = postRepository.findAllByUserId(userId);

        return myPosts.stream().map(PostReturnDto.naitonInfo::new).collect(Collectors.toList());
    }

    // 스크랩한 글 전체 조회
    @Override
    public List<PostReturnDto> getMyScrap(Long userId){ // userId에 로그인한 회원 Id가 들어가야 됨
        List<PostReturnDto> myScrapList = scrapRepository.findAllByUserId(userId).stream()
                                    .map(scrap -> new PostReturnDto(scrap.getPost()))
                                    .collect(Collectors.toList());
        return myScrapList;
    }

    // 메일 보내기
    // 임시 비밀번호 생성
    @Override
    public String getTmpPassword() {
        char[] charSet = new char[]{ '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
                'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N',
                'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'};

        String pwd = "";

        /* 문자 배열 길이의 값을 랜덤으로 10개를 뽑아 조합 */
        int idx = 0;
        for(int i = 0; i < 10; i++){
            idx = (int) (charSet.length * Math.random());
            pwd += charSet[idx];
        }

        log.info("임시 비밀번호 생성");

        return pwd;
    }

    // 임시 비밀번호로 업데이에
    @Override
    public void updatePassword(String tmpPassword, String memberEmail) {

        String encryptPassword = passwordEncoder.encode(tmpPassword);
        User user = userRepository.findByEmail(memberEmail).orElseThrow(() ->
                new IllegalArgumentException("해당 사용자가 존재하지 않습니다."));

        user.updatePassword(encryptPassword);
        log.info("임시 비밀번호 업데이트");
    }

    private boolean isValid(String input) {
        return input != null && !input.isEmpty();
    }



}
