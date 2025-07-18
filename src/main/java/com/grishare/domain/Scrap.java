package com.grishare.domain;

import com.grishare.domain.user.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
public class Scrap {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch=FetchType.LAZY)
    private User user;
    @ManyToOne(fetch = FetchType.LAZY)
    private Post post;


    public Scrap(Post post, User user){
        this.post = post;
        this.user = user;
    }

}
