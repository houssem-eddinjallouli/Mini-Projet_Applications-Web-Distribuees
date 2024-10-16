package tn.espritclubs.microservice_forum.repositores;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.espritclubs.microservice_forum.entities.Comment;
import tn.espritclubs.microservice_forum.entities.Post;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findAllByPost(Post post);
    Long countByPost(Post post);
}