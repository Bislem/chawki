import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService } from '@abacritt/angularx-social-login';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { catchError, map, of, take, takeLast, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  LOGIN_METHOD: 'fire' | 'fb' | 'google' | null = null;
  LOGIN_METHOD_KEY = "LOGIN_METHOD_KEY";

  constructor(
    private authService: SocialAuthService,
    private fireAuth: AngularFireAuth
  ) {
    this.LOGIN_METHOD = localStorage.getItem(this.LOGIN_METHOD_KEY) as any;
    console.log(this.LOGIN_METHOD);
  }

  signInWithFB() {
    localStorage.setItem(this.LOGIN_METHOD_KEY, 'fb');
    return this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  signInWithGoogle() {
    localStorage.setItem(this.LOGIN_METHOD_KEY, 'google');
    return this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  fireSignIn(email: string, pass: string) {
    localStorage.setItem(this.LOGIN_METHOD_KEY, 'fire');
    return this.fireAuth.signInWithEmailAndPassword(email, pass);
  }

  isAuth() {
    return new Promise<boolean>((resolve) => {
      console.log(this.LOGIN_METHOD);
      switch (this.LOGIN_METHOD) {
        case null:
          resolve(false);
          break;
        case 'fb':
          this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(user => {
            if (user) {
              resolve(true);
            } else {
              resolve(false)
            }
          });
          break;
        case 'fire':
          this.fireAuth.currentUser.then(user => {
            console.log(user);
            if (user) {
              resolve(true)
            } else {
              resolve(false)
            }
          });
          break;
        case 'google':
          this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(user => {
            if (user) {
              resolve(true);
            } else {
              resolve(false)
            }
          });
          break;
      }
    });
  }

  signOut(): void {
    localStorage.removeItem(this.LOGIN_METHOD_KEY);
    this.fireAuth.signOut();
    this.authService.signOut();
  }
}
