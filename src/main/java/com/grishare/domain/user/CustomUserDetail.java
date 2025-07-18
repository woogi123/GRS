package com.grishare.domain.user;

import lombok.Getter;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.GrantedAuthority;

import java.util.ArrayList;
import java.util.Collection;

    @Getter
    public class CustomUserDetail implements UserDetails {
        private User user;


        public CustomUserDetail(User user) {
            this.user = user;

        }

        // Getter 메서드들

        @Override
        public Collection<? extends GrantedAuthority> getAuthorities() {    // 사용자가 가지는 권한
            Collection<GrantedAuthority> collection = new ArrayList<>();
            return collection;
        }

        @Override
        public String getPassword() {
            return user.getPassword();
        }

        @Override
        public String getUsername() {
            return user.getUserLoginId();
        }

        @Override
        public boolean isAccountNonExpired() {  //사용자 계정 유효 기간 만료 여부
            return true;
        }

        @Override
        public boolean isAccountNonLocked() { // 사용자 게정 잠금 여부
            return true;
        }

        @Override
        public boolean isCredentialsNonExpired() {  //사용자 비밀번호 만료 여부
            return true;
        }

        @Override
        public boolean isEnabled() {    // 사용자 계정 활성화 여부
            return true;
        }


}
