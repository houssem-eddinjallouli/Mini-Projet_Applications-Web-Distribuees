package tn.espritclubs.microservice_forum.services;

import tn.espritclubs.microservice_forum.entities.Post;

import java.util.List;

public interface IPostService {
    List<Post> retrieveAllPosts();
    Post retrievePost(Long postId);
    Post addPost(Post post);
    void removePost(Long postId);
    Post modifyPost(Post post);
}
