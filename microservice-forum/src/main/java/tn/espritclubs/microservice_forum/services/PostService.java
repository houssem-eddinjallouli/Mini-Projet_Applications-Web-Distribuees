package tn.espritclubs.microservice_forum.services;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import tn.espritclubs.microservice_forum.entities.Post;
import tn.espritclubs.microservice_forum.repositores.PostRepository;

import java.util.List;

@Service
@AllArgsConstructor
public class PostService implements IPostService {

    PostRepository postRepository;

    @Override
    public List<Post> retrieveAllPosts() {
        return postRepository.findAll();
    }

    @Override
    public Post retrievePost(Long postId) {
        return postRepository.findById(postId).orElse(null);
    }

    @Override
    public Post addPost(Post post) {

        return postRepository.save(post);
    }



    @Override
    public void removePost(Long postId) {
        postRepository.deleteById(postId);
    }

    @Override
    public Post modifyPost(Post post) {
        return postRepository.save(post);
    }
}
