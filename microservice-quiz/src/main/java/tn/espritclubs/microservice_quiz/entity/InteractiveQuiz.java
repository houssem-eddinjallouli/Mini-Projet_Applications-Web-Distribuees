package tn.espritclubs.microservice_quiz.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.io.Serializable;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level=AccessLevel.PRIVATE)
public class InteractiveQuiz implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long id;
    String title;
    String description;
    String image;
    boolean active;

    @OneToMany(cascade = CascadeType.ALL)
    private Set<Question> questions;

    //@JsonIgnore
    //@OneToMany(cascade = CascadeType.ALL, mappedBy="test")
    //private Set<UserTest> userTests;

}
