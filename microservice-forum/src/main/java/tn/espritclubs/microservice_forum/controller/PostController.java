package tn.espritclubs.microservice_forum.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import tn.espritclubs.microservice_forum.entities.Post;
import tn.espritclubs.microservice_forum.services.IPostService;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Map;

@RestController
@AllArgsConstructor
@RequestMapping("/post")
public class PostController {
    IPostService postService;
    private final static String IMAGE_UPLOAD_DIR = System.getProperty("user.dir") + "/../frontend/src/assets/images/uploads/";

    @GetMapping("/retrieve-all-posts")
    public List<Post> getPosts() {
        return postService.retrieveAllPosts();
    }

    @GetMapping("/retrieve-post/{post-id}")
    public Post retrievePost(@PathVariable("post-id") Long postId) {
        return postService.retrievePost(postId);
    }

    @PostMapping("/add-post/{user-id}")
    public ResponseEntity<Object> addPost(@RequestParam("content") String content,
                                          @RequestParam(value = "image", required = false) MultipartFile image,
                                          @PathVariable("user-id") Long userId) {
        try {
            String imageUrl = null;
            if (image != null && !image.isEmpty()) {
                imageUrl = saveImage(image);
            }

            // Create a new Post object using the provided constructor
            Post post = new Post(content, imageUrl, userId);

            // Save the post to the database
            postService.addPost(post);

            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(Map.of(

                            "status", "success",

                            "message", "Post created successfully"

                    ));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of(
                                    "status", "error",
                                    "message", "Error creating post."
                            )
                    );
        }
    }

    // This method saves the image to your desired location
    private String saveImage(MultipartFile image) throws Exception {
        try {
            String fileName = image.getOriginalFilename();
            byte[] imageData = image.getBytes();

            Path imagePath = Paths.get(IMAGE_UPLOAD_DIR + fileName);
            Files.write(imagePath, imageData);

            return fileName; // Return only the file name
        } catch (Exception e) {
            e.printStackTrace(); // Log the exception
            throw e; // Rethrow the exception to propagate it
        }
    }




    @DeleteMapping("/remove-post/{post-id}")
    public void removePost(@PathVariable("post-id") Long postId) {
        postService.removePost(postId);
    }

    @PutMapping("/modify-post")
    public Post modifyPost(@RequestBody Post post) {
        return postService.modifyPost(post);
    }
}
