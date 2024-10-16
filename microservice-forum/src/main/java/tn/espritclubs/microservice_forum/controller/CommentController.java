package tn.espritclubs.microservice_forum.controller;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import tn.espritclubs.microservice_forum.entities.Comment;
import tn.espritclubs.microservice_forum.entities.Post;
import tn.espritclubs.microservice_forum.services.ICommentService;
import tn.espritclubs.microservice_forum.services.IPostService;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/comment")
public class CommentController {
    ICommentService commentService;
    IPostService postService;

    //@Operation(description = "Retrieve all comments from the database")
    @GetMapping("/retrieve-all-comments")
    public List<Comment> getComments() {
        return commentService.retrieveAllComments();
    }

    @GetMapping("/retrieve-all-comments/{post-id}")
    public List<Comment> retrieveAllCommentsByPost(@PathVariable("post-id") Long postId) {
        // Assuming you have a method in your PostService to retrieve a Post by ID
        Post post = postService.retrievePost(postId);
        return commentService.retrieveAllCommentsByPost(post);
    }
    //  @Operation(description = "Retrieve a specific comment by ID from the database")
    @GetMapping("/retrieve-comment/{comment-id}")
    public Comment retrieveComment(@PathVariable("comment-id") Long commentId) {
        return commentService.retrieveComment(commentId);
    }

    //  @Operation(description = "Add a comment to the database")
    @PostMapping("/add-comment/{post-id}/{user-id}")
    public Comment addComment(@RequestBody Comment comment, @PathVariable("post-id") Long postId, @PathVariable("user-id") Long userId) {
        return commentService.addComment(comment, postId, userId);
    }




    //  @Operation(description = "Remove a comment from the database")
    @DeleteMapping("/remove-comment/{comment-id}")
    public void removeComment(@PathVariable("comment-id") Long commentId) {
        commentService.removeComment(commentId);
    }

    //   @Operation(description = "Modify a comment in the database")
    @PutMapping("/modify-comment")
    public Comment modifyComment(@RequestBody Comment comment) {
        return commentService.modifyComment(comment);
    }

    @GetMapping("/count-comments/{post-id}")
    public Long countCommentsBypost(@PathVariable("post-id") Long postId){
        return commentService.countCommentsBypost(postId);
    }

}
