import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FacebookAuthProvider, GoogleAuthProvider, User } from 'firebase/auth';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUser!: BehaviorSubject<firebase.default.User | null>;

  constructor(private afAuth: AngularFireAuth) {
    this.currentUser = new BehaviorSubject(null) as BehaviorSubject<firebase.default.User | null>;
  }

  signInWithFacebook() {
    return this.afAuth.signInWithPopup(new FacebookAuthProvider());
  }

  signInWithGoogle() {
    return this.afAuth.signInWithPopup(new GoogleAuthProvider());
  }

  signInWithFirebase(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  signOut() {
    return this.afAuth.signOut();
  }

  isAuthenticated(): Observable<boolean> {
    return this.afAuth.authState.pipe(
      tap(user => {
        this.currentUser.next(user);
      }),
      map((user) => !!user),
    );
  }

  getCurrentUser(): Observable<firebase.default.User | null> {
    return this.afAuth.user.pipe(tap(user => {
      this.currentUser.next(user);
    }));
  }

  updateDisplayName(dname: string) {
    return this.currentUser.getValue()?.updateProfile({
      displayName: dname,
    });
  }

  sendEmailValidation() {
    this.currentUser.getValue()?.sendEmailVerification().then(res => {
      alert('validate your email please, check your inbox');
    });
  }
}
