package com.grishare.domain;

import com.grishare.domain.user.User;
import lombok.*;

import javax.persistence.*;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Data
@Builder
@Entity
public class LikeNation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    private Nation nation;
    @ManyToOne(fetch = FetchType.LAZY)
    private User user;

    public LikeNation(Nation nation, User user){
        this.nation = nation;
        this.user = user;
    }
}
