package tn.espritclubs.microservice_forum.repositores;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.espritclubs.microservice_forum.entities.Post;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
}
