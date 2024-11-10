package tn.espritclubs.microservice_forum.repositores;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.espritclubs.microservice_forum.entities.Post;
import tn.espritclubs.microservice_forum.entities.Reaction;

@Repository

public interface ReactionRepository extends JpaRepository<Reaction, Long> {

    Reaction findByPostAndUserId(Post post, Long userId);
    Long countByPost(Post post);
}