package com.grishare.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import com.grishare.service.UserServiceImpl;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig  {

    private final UserServiceImpl userDetailsService;


    // AuthenticationManager를 별도로 공유객체로 설정하는 구문이 없음 -> 새롭게 생성해서 사용해도 크게 문제 x
    @Bean
    AuthenticationManager authenticationManager(
            AuthenticationConfiguration authenticationConfiguration)throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }


    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        // 권한에 따라 허용하는 url 설정
        // /api/user/register(회원가입), /api/user/login 허용 -> 다른 페이지 추가되면 더 적용, 다른 페이지는 인증된 사용자만 허용
        http
                .csrf()
                .disable()
                .authorizeRequests()
                .antMatchers("/api/user/register","/api/user/login ","/**")
                .permitAll()
                .antMatchers(HttpMethod.OPTIONS,"/**").permitAll();  //cors로 인한 options 리퀘스트 보낼때 거부당하는거 방지
        // 로그인 설정
        http
                .formLogin()
                .loginPage("/api/user/login ")
                .usernameParameter("userId")
                .defaultSuccessUrl("/api"); // login에 성공하면 메인페이지로 redirect
        // 로그아웃 설정
        http
                .logout()
                .logoutSuccessUrl("/api/user/login"); // logout 할 시 로그인 페이지로 넘어가기
        http.userDetailsService(userDetailsService);

        return http.build();
    }

    // authenticationManager 인증 처리하는 filter로부터 인증처리를 지시받는 첫번째 클래스
    // ID와 Password를 Authentication 인증 객체에 저장하고 이 객체를 AuthenticationManager에 전달 이 인증에 대한 관리
    @Bean
    public AuthenticationManager authenticationManager(HttpSecurity http, PasswordEncoder passwordEncoder, UserDetailsService userDetailsService)
            throws  Exception {
        return http.getSharedObject(AuthenticationManagerBuilder.class)
                .userDetailsService(userDetailsService)
                .passwordEncoder(passwordEncoder)
                .and()
                .build();

    }


    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
