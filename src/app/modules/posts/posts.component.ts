import { Component, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/common/auth/auth.service';
import { Post } from 'src/app/common/models/post.model';
import { PostDialogComponent } from './post-dialog/post-dialog.component';
import { PostsService } from './posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  displayedColumns: string[] = ['id', 'title', 'likes', 'actions'];

  posts: Post[] = [];
  user: firebase.default.User | null = null;

  constructor(
    private dialogRef: MatDialog,
    private postsService: PostsService,
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.postsService.posts.subscribe(ps => {
      this.posts = ps;
    });
    this.auth.getCurrentUser().subscribe(user => {
      this.user = user;
      console.log('fucking user ==== >', user);
    });
  }

  isMyPost(p: Post) {
    return p.owner.uid === this.user?.uid;
  }

  didLike(p: Post) {
    const uid = this.user?.uid;
    if (p.likes && p.likes.length >= 0) {
      return p.likes.findIndex(u => u === uid) >= 0;
    }
    return false;
  }

  like(p: Post) {
    const uid = this.user?.uid;
    if (!p.likes) {
      p.likes = [];
    }
    const index = p.likes.findIndex(u => u === uid);
    if (index < 0) {
      p.likes.push(uid as string);
    } else {
      p.likes.splice(index, 1);
    }
    this.postsService.updatePost(p).then(res => {
      this.postsService.getPosts().subscribe();
    })
  }

  logout() {
    this.auth.signOut().then(res => {
      this.router.navigate(['/auth'])
    });
  }

  deletePost(p: Post) {
    this.postsService.deletePost(p.id).then(res => {
      this.postsService.getPosts().subscribe();
    });
  }

  openModal(mode: "new" | "edit", post?: Post) {
    const dialog = this.dialogRef.open(PostDialogComponent, {
      data: { post, mode, user: this.user },
      width: '400px',
      minHeight: '500px',
    });
    dialog.afterClosed().subscribe(res => {
      console.log('submited data === >', res);

      if (mode === "edit") {
        this.postsService.updatePost(res).then(res => {
          this.postsService.getPosts().subscribe();
        });
      } else {
        this.postsService.createPost(res).then(res => {
          this.postsService.getPosts().subscribe();
        });
      }
    });
  }
}
