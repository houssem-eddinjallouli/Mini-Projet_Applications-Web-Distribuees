package tn.espritclubs.microservice_quiz.entity;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level=AccessLevel.PRIVATE)
public class ApiOpenquizzdb implements Serializable {
    String langue;
    String categorie;
    String theme;
    String difficulte;
    String question;
    String reponse_correcte;
    String[] autres_choix;
    String anecdote;
    String wikipedia;
    /*          exemple
        {
            "langue": "fr",
            "categorie": "informatique",
            "theme": "Android",
            "difficulte": "débutant",
            "question": "Par quelle société le système Android est-il actuellement développé ?",
            "reponse_correcte": "Google",
            "autres_choix": [
                "Google",
                "Apple",
                "Microsoft"
            ],
            "anecdote": "Le système d'exploitation Android fut lancé en juin 2007 à la suite du rachat par Google en 2005 de la startup du même nom.",
            "wikipedia": "https://fr.wikipedia.org/wiki/Android"
        }
*/
}
