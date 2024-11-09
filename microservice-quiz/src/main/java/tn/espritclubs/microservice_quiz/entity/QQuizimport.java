package tn.espritclubs.microservice_quiz.entity;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level=AccessLevel.PRIVATE)
public class QQuizimport implements Serializable {
    int id;
    String question;
    String[] propositions;
    String réponse;
    String anecdote;
}
