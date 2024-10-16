package tn.espritclubs.microservice_quiz.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import tn.espritclubs.microservice_quiz.entity.InteractiveQuiz;

import java.util.List;

public interface InteractiveQuizRepository extends JpaRepository<InteractiveQuiz,Long> {
    @Query("SELECT t FROM InteractiveQuiz t JOIN t.questions q WHERE q.id = :questionId")
    List<InteractiveQuiz> findAllByQuestionId(@Param("questionId") Long questionId);
}
