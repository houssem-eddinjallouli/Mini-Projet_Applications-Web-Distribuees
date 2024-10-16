package tn.espritclubs.microservice_forum.services;

import tn.espritclubs.microservice_forum.entities.Reaction;

import java.util.List;

public interface IReactionService {
    List<Reaction> retrieveAllReactions();
    Reaction retrieveReaction(Long reactionId);
    Reaction getReactionByPostAndUser(Long post, Long userId);
    Reaction addReaction(Reaction reaction, Long postId, Long userId);
    void removeReaction(Long reactionId);
    Reaction modifyReaction(Reaction reaction);
    Long countReactionsByPost (Long postId);
}
