package tn.espritclubs.microservice_quiz.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.espritclubs.microservice_quiz.entity.QuestionOption;

public interface QuestionOptionRepository extends JpaRepository<QuestionOption,Long> {
}
