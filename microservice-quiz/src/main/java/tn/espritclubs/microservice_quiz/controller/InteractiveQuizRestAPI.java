package tn.espritclubs.microservice_quiz.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tn.espritclubs.microservice_quiz.entity.ApiOpenquizzdb;
import tn.espritclubs.microservice_quiz.entity.InteractiveQuiz;
import tn.espritclubs.microservice_quiz.entity.Question;
import tn.espritclubs.microservice_quiz.entity.Quizimport;
import tn.espritclubs.microservice_quiz.service.IInteractiveQuizService;

import java.util.List;

@RestController
@RequestMapping("quiz")
public class InteractiveQuizRestAPI {
    @Autowired
    IInteractiveQuizService iInteractiveQuizService;

    @GetMapping
    public String iamalive(){
        return "InteractiveQuiz micro service is working";
    }
    @PostMapping("/add-test")
    public String addTest(@RequestBody InteractiveQuiz test) {
        return iInteractiveQuizService.addInteractiveQuiz(test);
    }

    @PostMapping("/add-quiz/{img}")
    public void importquiz(@RequestBody Quizimport quiz, @PathVariable("img") String img) {
        //https://openquizzdb.org/media/cover/oqdb_quizz_204.jpg
        String image="https://openquizzdb.org/media/cover/oqdb_quizz_"+img+".jpg";
        iInteractiveQuizService.importquiz(quiz,image);
    }

    @GetMapping("/retrieve-all-tests")
    public List<InteractiveQuiz> retrieveAllTests() {
        return iInteractiveQuizService.retrieveAllInteractiveQuizs();
    }

    @GetMapping("/retrieve-test/{id}")
    public InteractiveQuiz retrieveTest(@PathVariable ("id") Long id) {
        return iInteractiveQuizService.retrieveInteractiveQuiz(id);
    }


    @PutMapping("/activateanactivate/{testId}")
    public void activateanactivate(@PathVariable("testId") Long testId) {
        iInteractiveQuizService.activateanactivate(testId);
    }

    @PostMapping("/add-quiz-api")
    public void addtestwithapi(@RequestBody List<ApiOpenquizzdb> apiOpenquizzdbs) {
        iInteractiveQuizService.addinteractiveQuizwithapi(apiOpenquizzdbs);
    }

    @DeleteMapping("/delete/{testId}")
    public void deletetest(@PathVariable("testId") Long testId) {
        iInteractiveQuizService.deleteinteractiveQuiz(testId);
    }

    @PutMapping("/updatetest/{id}/{title}/{description}")
    public String modifyTest(@PathVariable("id") Long id,@PathVariable("title") String title,@PathVariable("description") String description){
        return iInteractiveQuizService.modifyInteractiveQuiz(id,title,description);
    }

    @DeleteMapping("/deletequestion/{id}")
    public void deletequestion(@PathVariable("id") Long id) {
        iInteractiveQuizService.deletequestion(id);
    }

    @PostMapping("/add-question/{id}")
    public String addquestiontotest(@PathVariable("id") Long id, @RequestBody Question question){
        return iInteractiveQuizService.addquestiontointeractiveQuiz(id,question);
    }

}
