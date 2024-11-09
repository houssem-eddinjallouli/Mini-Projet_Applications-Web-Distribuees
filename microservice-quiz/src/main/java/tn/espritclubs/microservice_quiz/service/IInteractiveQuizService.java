package tn.espritclubs.microservice_quiz.service;

import tn.espritclubs.microservice_quiz.entity.ApiOpenquizzdb;
import tn.espritclubs.microservice_quiz.entity.InteractiveQuiz;
import tn.espritclubs.microservice_quiz.entity.Question;
import tn.espritclubs.microservice_quiz.entity.Quizimport;

import java.util.List;

public interface IInteractiveQuizService {
    public String addInteractiveQuiz(InteractiveQuiz interactiveQuiz);
    public void activateanactivate(Long interactiveQuizId);
    public void deleteinteractiveQuiz(Long interactiveQuizId);
    public String modifyInteractiveQuiz(Long id, String title, String description);
    public List<InteractiveQuiz> retrieveAllInteractiveQuizs();
    public InteractiveQuiz retrieveInteractiveQuiz(Long interactiveQuizId);
    public String addquestiontointeractiveQuiz(Long idInteractiveQuiz, Question question);
    public void deletequestion(Long questionId);
    public void importquiz(Quizimport quiz, String imgnbr);
//
//
    //public void adduserinteractiveQuiz(UserInteractiveQuiz userInteractiveQuiz);
    //public List<UserInteractiveQuiz> showallinteractiveQuizs();

    //
    //
    public void addinteractiveQuizwithapi(List<ApiOpenquizzdb> apiOpenquizzdbs);
    //public void deleteut(Long id);
    //
    //public void addgemini(Gemini gemini);
    //public List<Gemini> getallgemini(Long id);
    // interactiveQuiz's comments service
    //public List<InteractiveQuizComments> getComments(Long id);
    //public List<InteractiveQuizComments> getCommentsThatNeedToBeAnnsered();
    //public InteractiveQuizComments createComment(InteractiveQuizComments interactiveQuizComments);
    //public InteractiveQuizComments updateComment(String text, String parentId,Long id);
    //public void deleteComment(Long parentId);
    // ranking of the results
    //public List<UserInteractiveQuiz> getTop3UsersPerInteractiveQuiz();
}
