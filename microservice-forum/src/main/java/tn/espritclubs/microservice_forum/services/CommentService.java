package tn.espritclubs.microservice_forum.services;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import tn.espritclubs.microservice_forum.entities.Comment;
import tn.espritclubs.microservice_forum.entities.Post;
import tn.espritclubs.microservice_forum.repositores.CommentRepository;
import tn.espritclubs.microservice_forum.repositores.PostRepository;

import java.util.List;

@Service
@AllArgsConstructor
public class CommentService implements ICommentService {
    CommentRepository commentRepository;
    PostRepository postRepository;
    @Override
    public List<Comment> retrieveAllComments() {
        return  commentRepository.findAll();
    }

    @Override
    public List<Comment> retrieveAllCommentsByPost(Post post) {

        return commentRepository.findAllByPost(post);
    }

    @Override
    public Comment retrieveComment(Long commentId) {
        return commentRepository.findById(commentId).orElse(null);
    }

    @Override
    public Comment addComment(Comment comment, Long postId, Long userId) {
        Post post = postRepository.findById(postId).get();
        comment.setPost(post);
        comment.setUserId(userId);
        return commentRepository.save(comment);
    }

    @Override
    public void removeComment(Long commentId) {
        commentRepository.deleteById(commentId);
    }
    @Override
    public Comment modifyComment(Comment comment) {
        return commentRepository.save(comment);
    }

    @Override
    public Long countCommentsBypost(Long postId) {
        Post post = postRepository.findById(postId).get();
        return commentRepository.countByPost(post);
    }
}
