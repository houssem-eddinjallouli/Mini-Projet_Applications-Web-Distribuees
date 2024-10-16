package tn.espritclubs.microservice_forum.services;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import tn.espritclubs.microservice_forum.entities.Post;
import tn.espritclubs.microservice_forum.entities.Reaction;
import tn.espritclubs.microservice_forum.repositores.PostRepository;
import tn.espritclubs.microservice_forum.repositores.ReactionRepository;

import java.util.List;

@Service
@AllArgsConstructor
public class ReactionService implements IReactionService {

    ReactionRepository reactionRepository;
    PostRepository postRepository;
    // UserRepository userRepository;
    @Override
    public List<Reaction> retrieveAllReactions() {
        return reactionRepository.findAll();
    }

    @Override
    public Reaction retrieveReaction(Long reactionId) {
        return reactionRepository.findById(reactionId).orElse(null);
    }

    @Override
    public Reaction getReactionByPostAndUser(Long postId, Long userId) {
        Post post = postRepository.findById(postId).get();
        //User user = userRepository.findById(userId).get();
        return reactionRepository.findByPostAndUserId(post,userId);
    }

    @Override
    public Reaction addReaction(Reaction reaction, Long postId, Long userId) {
        Post post = postRepository.findById(postId).get();
        reaction.setPost(post);
        reaction.setUserId(userId);

        return reactionRepository.save(reaction);
    }

    @Override
    public void removeReaction(Long reactionId) {
        reactionRepository.deleteById(reactionId);
    }

    @Override
    public Reaction modifyReaction(Reaction reaction) {
        return reactionRepository.save(reaction);
    }

    @Override
    public Long countReactionsByPost(Long postId) {
        Post post = postRepository.findById(postId).get();
        return reactionRepository.countByPost(post);
    }
}
