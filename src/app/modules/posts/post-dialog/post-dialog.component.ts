import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import { Post } from 'src/app/common/models/post.model';

@Component({
  selector: 'app-post-dialog',
  templateUrl: './post-dialog.component.html',
  styleUrls: ['./post-dialog.component.scss']
})
export class PostDialogComponent implements OnInit {

  form!: UntypedFormGroup;

  constructor(
    private dialogRef: MatDialogRef<PostDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { mode: "new" | "edit"; post?: Post, user: firebase.default.User },
  ) { }

  ngOnInit(): void {
    if (this.data.mode === 'new') {
      this.form = new UntypedFormGroup({
        title: new FormControl(null, Validators.required),
        content: new FormControl(null, Validators.minLength(10)),
      });
    } else if (this.data.post) {
      this.form = new UntypedFormGroup({
        title: new FormControl(this.data.post.title, Validators.required),
        content: new FormControl(this.data.post.content, Validators.minLength(10)),
      });
    }
  }

  submit() {
    if (this.form.valid) {
      if (this.data.mode === "edit") {
        return this.dialogRef.close({
          ...this.data.post,
          ...this.form.value,
          updatedAt: moment().unix(),
        } as Post);
      } else {
        return this.dialogRef.close({
          ...this.form.value,
          createdAt: moment().unix(),
          updatedAt: moment().unix(),
          owner: {
            uid: this.data.user.uid,
            email: this.data.user.email,
            displayName: this.data.user.displayName,
            photoURL: this.data.user.photoURL,
          },
          // likes: []
        } as Post);
      }
    }
  }


}
