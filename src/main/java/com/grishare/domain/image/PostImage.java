package com.grishare.domain.image;


import com.grishare.domain.Post;
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
@DiscriminatorValue("post")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PostImage extends Image{
    @OneToOne(fetch = FetchType.LAZY)
    private Post post;

    public PostImage(Post post, String imageUrl) {
        super(imageUrl);
        this.post = post;
    }
}
