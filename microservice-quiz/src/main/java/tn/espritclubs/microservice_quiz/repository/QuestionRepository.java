package tn.espritclubs.microservice_quiz.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.espritclubs.microservice_quiz.entity.Question;

public interface QuestionRepository extends JpaRepository<Question,Long> {
}
