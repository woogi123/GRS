package com.grishare.domain.image;

import com.grishare.domain.user.User;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@DiscriminatorValue("user")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserImage extends Image{

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    public UserImage(User user, String imageUrl) {
        super(imageUrl);
        this.user = user;
    }
}