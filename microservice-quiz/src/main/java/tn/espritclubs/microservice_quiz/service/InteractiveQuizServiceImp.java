package tn.espritclubs.microservice_quiz.service;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import tn.espritclubs.microservice_quiz.entity.*;
import tn.espritclubs.microservice_quiz.repository.InteractiveQuizRepository;
import tn.espritclubs.microservice_quiz.repository.QuestionOptionRepository;
import tn.espritclubs.microservice_quiz.repository.QuestionRepository;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@AllArgsConstructor
public class InteractiveQuizServiceImp implements IInteractiveQuizService{
    InteractiveQuizRepository testRepository;
    QuestionRepository questionRepository;
    QuestionOptionRepository questionOptionRepository;
    //GeminiRepository geminiRepository;
    //TestCommentsRepository testCommentsRepository;
    //UserRepository userRepository;
    //UserTestRepository userTestRepository;
    @Override
    public String addInteractiveQuiz(InteractiveQuiz interactiveQuiz) {
        Set<Question> questions = new HashSet<>();
        for (Question q : interactiveQuiz.getQuestions()) {
            questions.add(q);
            Set<QuestionOption> options = new HashSet<>();
            for (QuestionOption o : q.getQuestionOptions())
                options.add(o);
            q.setQuestionOptions(options);
        }
        interactiveQuiz.setActive(true);
        interactiveQuiz.setQuestions(questions);
        testRepository.save(interactiveQuiz);

        return "test added succesfuly";
    }

    @Override
    public void activateanactivate(Long interactiveQuizId) {
        InteractiveQuiz test = testRepository.findById(interactiveQuizId).orElse(null);
        if (!test.isActive())
            test.setActive(true);
        else
            test.setActive(false);
        testRepository.save(test);
    }

    @Override
    public void deleteinteractiveQuiz(Long interactiveQuizId) {
        testRepository.deleteById(interactiveQuizId);
    }

    @Override
    public String modifyInteractiveQuiz(Long id, String title, String description) {
        InteractiveQuiz oldtest = testRepository.findById(id).orElse(null);
        oldtest.setTitle(title);
        oldtest.setDescription(description);
        //oldtest.setImage(test.getImage());
        testRepository.save(oldtest);
        return "test updated succesfuly";
    }

    @Override
    public List<InteractiveQuiz> retrieveAllInteractiveQuizs() {
        return testRepository.findAll();
    }

    @Override
    public InteractiveQuiz retrieveInteractiveQuiz(Long interactiveQuizId) {
        return testRepository.findById(interactiveQuizId).orElse(null);
    }

    @Override
    public String addquestiontointeractiveQuiz(Long idInteractiveQuiz, Question question) {
        InteractiveQuiz test = testRepository.findById(idInteractiveQuiz).orElse(null);
        test.getQuestions().add(question);
        testRepository.save(test);
        return null;
    }

    @Override
    @Transactional
    public void deletequestion(Long questionId) {
        Question question = questionRepository.findById(questionId).orElse(null);
        List<InteractiveQuiz> tests = testRepository.findAllByQuestionId(questionId);
        for (InteractiveQuiz test : tests) {
            Set<Question> newquestions = new HashSet<>();
            for (Question q : test.getQuestions())
                if (q.getId() != questionId)
                    newquestions.add(q);
            test.setQuestions(newquestions);
            testRepository.save(test);
        }
        assert question != null;
        questionOptionRepository.deleteAll(question.getQuestionOptions());
        questionRepository.deleteById(questionId);
    }

    @Override
    public void importquiz(Quizimport quiz, String imgnbr) {
        QQuizimport[] qQuizimport = quiz.getQuizz();
        InteractiveQuiz test = new InteractiveQuiz();
        test.setTitle(quiz.getNom());

        Set<Question> questions = new HashSet<>();
        for (QQuizimport q : qQuizimport) {
            Question question = new Question();
            question.setQuestion(q.getQuestion());

            question.setImage(q.getQuestion());
            question.setAnecdote(q.getAnecdote());

            Set<QuestionOption> options = new HashSet<>();
            String[] propositions = q.getPropositions();
            String ans = q.getRéponse();
            for (String proposition : propositions) {
                QuestionOption option = new QuestionOption();
                option.setAnswer(proposition);
                if (option.getAnswer().equals(ans)) {
                    option.setIscorrect(true);
                } else {
                    option.setIscorrect(false);
                }
                options.add(option);
            }

            question.setQuestionOptions(options);
            questions.add(question);
        }
        test.setImage(imgnbr);
        test.setActive(true);
        test.setQuestions(questions);
        testRepository.save(test);
    }

    @Override
    public void addinteractiveQuizwithapi(List<ApiOpenquizzdb> apiOpenquizzdbs) {
        InteractiveQuiz test = new InteractiveQuiz();
        ApiOpenquizzdb anyone = apiOpenquizzdbs.get(0);
        test.setTitle(anyone.getCategorie());
        test.setDescription("a simple test about " + anyone.getCategorie() + " in" + anyone.getLangue() + " and the difficulti is : " + anyone.getDifficulte());
        test.setImage("assets/img/quiz/" + anyone.getCategorie() + ".png");
        Set<Question> questions = new HashSet<>();
        for (ApiOpenquizzdb q : apiOpenquizzdbs) {
            Question question = new Question();
            question.setQuestion(q.getQuestion());
            question.setImage(q.getTheme());
            Set<QuestionOption> options = new HashSet<>();
            String[] propositions = q.getAutres_choix();
            String ans = q.getReponse_correcte();
            for (String proposition : propositions) {
                QuestionOption option = new QuestionOption();
                option.setAnswer(proposition);
                if (option.getAnswer().equals(ans)) {
                    option.setIscorrect(true);
                } else {
                    option.setIscorrect(false);
                }
                options.add(option);
            }

            question.setQuestionOptions(options);
            questions.add(question);
            question.setAnecdote(q.getAnecdote());
            question.setWikipedia(q.getWikipedia());
        }
        test.setActive(true);
        test.setQuestions(questions);
        testRepository.save(test);
    }

}
