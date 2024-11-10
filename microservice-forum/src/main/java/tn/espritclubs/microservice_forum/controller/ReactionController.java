package tn.espritclubs.microservice_forum.controller;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import tn.espritclubs.microservice_forum.entities.Reaction;
import tn.espritclubs.microservice_forum.services.IReactionService;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/reaction")
public class ReactionController {
    private final IReactionService reactionService;

    @GetMapping("/retrieve-all-reactions")
    public List<Reaction> getReactions() {
        return reactionService.retrieveAllReactions();
    }

    @GetMapping("/retrieve-reaction/{reaction-id}")
    public Reaction retrieveReaction(@PathVariable("reaction-id") Long reactionId) {
        return reactionService.retrieveReaction(reactionId);
    }

    @PostMapping("/add-reaction/{post-id}/{user-id}")
    public Reaction addReaction(@RequestBody Reaction reaction, @PathVariable("post-id") Long postId, @PathVariable("user-id") Long userId) {
        return reactionService.addReaction(reaction, postId, userId);
    }

    @DeleteMapping("/remove-reaction/{reaction-id}")
    public void removeReaction(@PathVariable("reaction-id") Long reactionId) {
        reactionService.removeReaction(reactionId);
    }

    @PutMapping("/modify-reaction")
    public Reaction modifyReaction(@RequestBody Reaction reaction) {
        return reactionService.modifyReaction(reaction);
    }

    @GetMapping("/get-reaction/{post-id}/{user-id}")
    public Reaction getReactionByPostAndUser(@PathVariable("post-id") Long postId,@PathVariable("user-id") Long userId ) {
        return reactionService.getReactionByPostAndUser(postId,userId);
    }
    @GetMapping("/count-reaction/{post-id}")
    public Long countReactionsByPost(@PathVariable("post-id") Long postId) {
        return reactionService.countReactionsByPost(postId);
    }
}
