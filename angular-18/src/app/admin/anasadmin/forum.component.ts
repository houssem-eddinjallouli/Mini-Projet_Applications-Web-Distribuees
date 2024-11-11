
import {Component, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ModalComponent} from "angular-custom-modal";
import Swal from "sweetalert2";
import { animate, style, transition, trigger } from '@angular/animations';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { PostService } from '../../services/post/post.service';
import { CommentService } from '../../services/comment/comment.service';
import { ReactionService } from '../../services/reaction/reaction.service';
import { QuoteService } from '../../services/quoteService/quote.service';



@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css'],
  animations: [
    trigger('toggleAnimation', [
        transition(':enter', [style({ opacity: 0, transform: 'scale(0.95)' }), animate('100ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))]),
        transition(':leave', [animate('75ms', style({ opacity: 0, transform: 'scale(0.95)' }))]),
    ]),
],
})
export class ForumComponent {
    postParams: FormGroup;
    commentParams: FormGroup;
    postsList:any =[];
    commentList:any=[];
    postIdToUpdate: any = null;
    selectedPostId: any;
    showReactions = false;
    postReactions: { [postId: number]: string } = {};
    postReactionCounts: { [postId: number]: number } = {}; // This object will store the reaction count for each post
    postShowReactions: { [postId: number]: boolean } = {}; // Store showReactions state for each post
    quote: string = '';
    constructor(public fb: FormBuilder, public postService:PostService, public commentService:CommentService, private reactionService: ReactionService, private quoteService: QuoteService) {
        this.postParams = this.fb.group({
            content: [''], // Only content field
            image: [null], // Optional image field
            user: [null]
        });
        this.commentParams = this.fb.group({
            content: [''],
            user:[null]
        })

    }
    defaultParams = {
        id: null,
        title: '',
        description: '',
        tag: '',
        user: '',
        thumb: '',
    };
    @ViewChild('isAddNoteModal') isAddNoteModal!: ModalComponent;
    @ViewChild('isDeleteNoteModal') isDeleteNoteModal!: ModalComponent;
    @ViewChild('isViewNoteModal') isViewNoteModal!: ModalComponent;
    @ViewChild('showComments') showComments!: ModalComponent;
    @ViewChild('isAddCommentModal') isAddCommentModal!: ModalComponent;

    isShowNoteMenu = false;
    notesList = [
        {
            id: 1,
            user: 'Max Smith',
            thumb: 'profile-16.jpeg',
            title: 'Meeting with Kelly',
            description: 'Curabitur facilisis vel elit sed dapibus sodales purus rhoncus.',
            date: '11/01/2020',
            isFav: false,
            tag: 'personal',
        },
        {
            id: 2,
            user: 'John Doe',
            thumb: 'profile-14.jpeg',
            title: 'Receive Package',
            description: 'Facilisis curabitur facilisis vel elit sed dapibus sodales purus.',
            date: '11/02/2020',
            isFav: true,
            tag: '',
        },
        {
            id: 3,
            user: 'Kia Jain',
            thumb: 'profile-15.jpeg',
            title: 'Download Docs',
            description: 'Proin a dui malesuada, laoreet mi vel, imperdiet diam quam laoreet.',
            date: '11/04/2020',
            isFav: false,
            tag: 'work',
        },
    ];
    filterdNotesList: any = '';
    selectedTab: any = 'all';
    deletedNote: any = null;
    selectedNote: any = {
        id: null,
        title: '',
        description: '',
        tag: '',
        user: '',
        thumb: '',
    };

    ngOnInit() {
        localStorage.setItem('loginToken',"eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzdHJpbmciLCJpYXQiOjE3MDk3NzU1NDUsImV4cCI6MTcxMTI0Njc3NH0.kQe37lM6utPFSVISnE31hEopoKX7AvEH4Jt_kNsan3o");
        this.getPosts()
        this.getQuote()


    }
    getQuote(): void {
        this.quoteService.getMotivationalQuote()
          .subscribe(
            (data: any) => {
              this.quote = data.content;
            },
            (error: any) => {
              console.error('Error fetching quote:', error);
            }
          );
      }

    deletePost(id: any) {
        // Delete offer logic here
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                // Assuming delete method exists
                this.postService.deletePost(id).subscribe(() => {
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    );
                    this.getPosts(); // Reload or update local data
                });
            }
        });
    }

    deleteComment(id: any) {
        // Delete offer logic here
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                // Assuming delete method exists
                this.commentService.deleteComment(id).subscribe(() => {
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    );
                    this.getCommentsByPost(this.selectedPostId); // Reload or update local data
                });
            }
        });
    }
    getPosts(){
        this.postService.getPosts().subscribe((res:any) =>{
            this.postsList=res;
            this.postsList.forEach((post:any) => {
            this.getReactionForPost(post);
            this.countReactionForPosts();
        });
        })
    }
    getCommentsByPost(postId: Number){
        this.commentService.getCommentsByPost(postId).subscribe((res:any)=>{
            this.commentList=res;
        })
    }
    showPostComments(postId: Number){
        this.showComments.open()
        this.getCommentsByPost(postId)
    }
    initForm() {
        this.postParams = this.fb.group({

            content: ['', Validators.required],
            image: [''],

        });
    }
    searchNotes() {
        if (this.selectedTab != 'fav') {
            if (this.selectedTab != 'all' || this.selectedTab === 'delete') {
                this.postsList = this.postsList.filter((d: { tag: any }) => d.tag === this.selectedTab);
            } else {
                this.postsList = this.postService.getPosts().subscribe(p=>{
                    console.log("data from posts",p)
                    return p
                });
            }
        } else {
            this.filterdNotesList = this.notesList.filter((d: { isFav: any }) => d.isFav);
        }
    }
// Continuing in your post component
reactToPost(postId: number, userId: number, reactionType: string): void {
    this.reactionService.getReaction(postId, userId).subscribe(reaction => {
        if (reaction && reaction.reactionType === reactionType) {
            this.removeReaction(reaction.id, postId);
        }
        else if(reaction && reaction.reactionType !== reactionType){
            reaction.reactionType = reactionType;
            this.changeReaction(reaction);
        }
        else {
            this.addReaction(postId, userId, reactionType);
        }
        this.postReactions[postId] = reactionType; // Update the post's reaction type
    });


}
getReactionForPost(post: any): void {
    const postId = post.id; // Replace id with your actual post ID property
    const userId = 2; // Replace 1 with the actual user ID

    this.reactionService.getReaction(postId, userId).subscribe(reaction => {
      if (reaction) {
        this.postReactions[postId] = reaction.reactionType;
      } else {
        this.postReactions[postId] = 'DEFAULT';
      }
    });
  }

addReaction(postId: number, userId: number, reactionType: string): void {
    this.reactionService.reactToPost(postId, userId, reactionType)
        .subscribe(() => {
            console.log(`Reacted to post ${postId} with reaction: ${reactionType}`);
            this.countReactionForOnePost(postId)
        });
}
changeReaction(reaction: any){
    this.reactionService.changeReaction( reaction)
    .subscribe(() => {
        console.log("Reaction changed");
        // Optionally, you can perform any additional logic here
    });
}
removeReaction(reactionId: number, postId:number): void {
    this.reactionService.removeReaction(reactionId)
        .subscribe(() => {
            console.log("Removed reaction from post");
            this.getPosts()
        });

}
toggleReactions(postId: number, event: MouseEvent): void {
    event.stopPropagation();
    this.postShowReactions[postId] = !this.postShowReactions[postId]; // Toggle showReactions state for the specific post
  }

// Method to get the class of the default button icon based on the current reaction type
getReactionIconClass(postId: number): string {
    const reactionType = this.postReactions[postId] || 'DEFAULT';
    switch (reactionType) {
        case 'LIKE':
            return 'fa-solid fa-thumbs-up text-lg';
        case 'LOVE':
            return 'fa-solid fa-heart text-lg';
        case 'SUPPORT':
            return 'fa-solid fa-face-smile-beam text-lg';
        case 'ANGRY':
            return 'fa-solid fa-face-angry text-lg';
        case 'SAD':
            return 'fa-solid fa-face-frown text-lg';
        default:
            return 'fa-regular fa-thumbs-up text-lg';
    }

}

// Method to get the color of the default button icon based on the current reaction type
getReactionColor(postId: number): string {
    const reactionType = this.postReactions[postId] || 'DEFAULT';
    switch (reactionType) {
        case 'LIKE':
            return '#0d14de';
        case 'LOVE':
            return '#ff0000';
        case 'SUPPORT':
        case 'ANGRY':
        case 'SAD':
            return '#FFD43B';
        default:
            return '#0d14de';
    }
}
countReactionForOnePost(postId: number){
    this.reactionService.countReaction(postId).subscribe(count => {
        this.postReactionCounts[postId] = count; // Store the count in the postReactionCounts object
    });
}
countReactionForPosts(): void {
    this.postsList.forEach((post:any) => {
        this.countReactionForOnePost(post.id)
    });
}

    savePost() {
        const content = this.postParams.value.content; // Get content from the form
        const image = this.postParams.value.image; // Get image from the form
        console.log(this.postParams.value)
        let user =  2; // Get user from the form

        // Check if user is not provided, set a default value
        if (user === null || user === undefined) {
            user = 0; // Set a default user ID, replace with your default value
        }

        this.postService.createPost(content, image, user).subscribe(
            response => {
                // Handle success response here if needed
                this.showMessage('Post has been saved successfully.');
                this.isAddNoteModal.close();
                this.getPosts()
            },
            error => {
                // Handle error response here if needed
                console.error('Error saving post:', error);
                this.showMessage('Error saving post.', 'error');
            }
        );


    }



    onImageSelected(event: any) {
        const file = event.target.files[0];
        this.postParams.patchValue({
            image: file
        });
    }
    initCommentForm() {
        this.commentParams = this.fb.group({
            content: ['', Validators.required]
        });
    }
    openAddCommentModal(postId: any) {
        this.selectedPostId = postId;
        this.isAddCommentModal.open();
      }
      saveComment(postId: any) {
        const content = this.commentParams.value.content;
        const userId = 2; // Assuming you set a default user ID if not provided

        this.commentService.createComment(content, postId, userId)
            .pipe(
                catchError(error => {
                    console.error('Error saving comment:', error);
                    this.showMessage('Error saving comment.', 'error');
                    return of(null); // Return a default value or re-throw the error as needed
                })
            )
            .subscribe(response => {
                if (response !== null) {
                    // Handle success response here if needed
                    this.showMessage('Comment has been saved successfully.');
                    this.isAddCommentModal.close();
                }
            });
            this.initCommentForm();
    }

    deleteNote() {
        this.notesList = this.notesList.filter((d: { id: any }) => d.id != this.deletedNote.id);
        this.searchNotes();
        this.showMessage('Note has been deleted successfully.');
        this.isDeleteNoteModal.close();
    }

    editNote(note: any = null) {
        this.isShowNoteMenu = false;
        this.isAddNoteModal.open();
        this.initForm();
        if (note) {
            this.postParams.setValue({
                id: note.id,
                title: note.title,
                description: note.description,
                tag: note.tag,
                user: note.user,
                thumb: note.thumb,
            });
        }
    }

    editPost(post: any ) {
        this.isShowNoteMenu = false;
        this.isAddNoteModal.open();
        this.initForm();
        if (post) {
          // Set the form values from the post being edited
            this.postParams.patchValue({
            content: post.content,
            image: post.image
            });
          this.postIdToUpdate = post.id; // Set the postIdToUpdate
        }
    }
    updatePost() {
        if (this.postIdToUpdate !== null) {
            const updatedPost = {
                id: this.postIdToUpdate,
                content: this.postParams.value.content,
                image: this.postParams.value.image
            };

            // Call the updatePost service function
            this.postService.updatePost(updatedPost).subscribe(response => {
                // Handle response if needed
                console.log("Post updated successfully:", response);
                // Optionally close the modal or perform any other action
                this.isAddNoteModal.close();
                // Reset postIdToUpdate
                this.postIdToUpdate = null;
            }, error => {
                // Handle error if needed
                console.error("Error updating post:", error);
            });
        }
    }
    tabChanged(type: string) {
        this.selectedTab = type;
        this.searchNotes();
        this.isShowNoteMenu = false;
    }

    setFav(note: any) {
        let item = this.filterdNotesList.find((d: { id: any }) => d.id === note.id);
        item.isFav = !item.isFav;
        this.searchNotes();
    }

    setTag(note: any, name: string = '') {
        let item = this.filterdNotesList.find((d: { id: any }) => d.id === note.id);
        item.tag = name;
        this.searchNotes();
    }

    deleteNoteConfirm(note: any) {
        setTimeout(() => {
            this.deletedNote = note;
            this.isDeleteNoteModal.open();
        });
    }

    viewNote(note: any) {
        setTimeout(() => {
            this.selectedNote = note;
            this.isViewNoteModal.open();
        });
    }





    showMessage(msg = '', type = 'success') {
        const toast: any = Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 3000,
            customClass: { container: 'toast' },
        });
        toast.fire({
            icon: type,
            title: msg,
            padding: '10px 20px',
        });
    }

    async sortPosts(posts: any[]): Promise<void> { // Change return type to void
    const currentTime = new Date().getTime();
    const twoDaysInMillis = 2 * 24 * 60 * 60 * 1000;

    for (let post of posts) {
        post.score = await this.reactionService.countReaction(post.id).toPromise() + await this.commentService.countComments(post.id).toPromise();
        post.isOlderThanTwoDays = (currentTime - new Date(post.createdAt).getTime()) > twoDaysInMillis;
    }

    posts.sort((postA, postB) => {
        if (postA.isOlderThanTwoDays && postB.isOlderThanTwoDays) {
            return postB.score - postA.score;
        } else if (postA.isOlderThanTwoDays) {
            return 1;
        } else if (postB.isOlderThanTwoDays) {
            return -1;
        } else {
            if (postA.score !== postB.score) {
                return postB.score - postA.score;
            } else {
                return new Date(postB.createdAt).getTime() - new Date(postA.createdAt).getTime();
            }
        }
    });
}
}
