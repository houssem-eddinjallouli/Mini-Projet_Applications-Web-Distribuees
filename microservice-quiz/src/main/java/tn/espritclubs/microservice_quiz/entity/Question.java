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
public class Question implements Serializable{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long id;
    String question;
    String image;
    String anecdote;
    String wikipedia;

    @OneToMany(cascade = CascadeType.ALL)
    private Set<QuestionOption> questionOptions;

}
