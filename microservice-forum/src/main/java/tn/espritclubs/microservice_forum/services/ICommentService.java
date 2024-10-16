package tn.espritclubs.microservice_forum.services;

import tn.espritclubs.microservice_forum.entities.Comment;
import tn.espritclubs.microservice_forum.entities.Post;

import java.util.List;

public interface ICommentService {
    List<Comment> retrieveAllComments();
    List<Comment> retrieveAllCommentsByPost(Post Post);


    Comment retrieveComment(Long commentId);
    Comment addComment(Comment comment, Long postId, Long userId);
    void removeComment(Long commentId);
    Comment modifyComment(Comment comment);
    Long countCommentsBypost(Long post);
}
