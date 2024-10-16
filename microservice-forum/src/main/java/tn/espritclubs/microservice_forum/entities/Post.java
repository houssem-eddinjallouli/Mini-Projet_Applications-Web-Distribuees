package tn.espritclubs.microservice_forum.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.CreationTimestamp;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)

@Entity
public class Post implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    Date CreatedAt;

    String content;
    String image ;
    Long userId;


    // Constructor with content, imagePath, and userName
    public Post(String content, String image, Long userId) {
        this.content = content;
        this.image = image;
        this.userId = userId;
    }
    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "post")
    List<Comment> comments;
    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "post")
    List<Reaction> reactions;




}
