import { Injectable, Query } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, Firestore, updateDoc } from '@angular/fire/firestore';
import { CollectionReference, DocumentReference, getDocs, query, where } from 'firebase/firestore';
import { BehaviorSubject, tap } from 'rxjs';
import { AuthService } from 'src/app/common/auth/auth.service';
import { POSTS_COLLECTION_NAME } from 'src/app/common/fire/collections';
import { Post } from 'src/app/common/models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostsService {


  posts: BehaviorSubject<Post[]> = new BehaviorSubject([] as Post[]);
  myPosts: BehaviorSubject<Post[]> = new BehaviorSubject([] as Post[]);

  constructor(
    private firestore: Firestore,
    private authService: AuthService
  ) { }

  getPosts() {
    const colRef = collection(this.firestore, POSTS_COLLECTION_NAME) as CollectionReference<Post>;
    return collectionData<Post>(colRef, { idField: 'id' })
      .pipe(tap(res => {
        this.posts.next(res);
      }));
  }

  getMyPosts(uid?: string) {
    const user = this.authService.currentUser.getValue();
    console.log('my posts == >   ',user);
    const colRef = collection(this.firestore, POSTS_COLLECTION_NAME);
    const q = query(colRef, where('owner.uid', '==', user?.uid as string));
    return collectionData<Post>(q as any, { idField: 'id' })
      .pipe(tap(res => {
        this.myPosts.next(res);
      }));
  }

  createPost(data: Post) {
    const colRef = collection(this.firestore, POSTS_COLLECTION_NAME);
    return addDoc(colRef, data);
  }

  updatePost(data: Post) {
    const docRef = doc(this.firestore, POSTS_COLLECTION_NAME, data.id) as DocumentReference<Post>;
    return updateDoc<Post>(docRef, data);
  }

  deletePost(id: string) {
    const docRef = doc(this.firestore, POSTS_COLLECTION_NAME, id);
    return deleteDoc(docRef);
  }
}
