package tn.espritclubs.microservice_quiz.entity;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level=AccessLevel.PRIVATE)
public class Quizimport implements Serializable {
    String nom;
    QQuizimport[] quizz;
}
