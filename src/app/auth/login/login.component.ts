import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FacebookAuthProvider, GoogleAuthProvider } from 'firebase/auth';
import { AuthService } from 'src/app/common/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  authForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private socialAuthService: SocialAuthService
  ) {

  }

  ngOnInit(): void {
    this.authService.signOut();
    this.authService.isAuth().then(res=>console.log(res));
    this.authForm = new FormGroup({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    });
  }

  normalAuth() {
    const email = this.authForm.value.email;
    const pass = this.authForm.value.password;
    if (!email && !pass) {
      return alert("please fill the form first");
    }
    this.authService.fireSignIn(email, pass).then(user => {
      alert('Logged in successfully');
      console.log(user);
    }).catch(err => {
      alert('Password or email is wrong please check again');
    })
  }

  facebookAuth() {
    this.authService.signInWithFB().then(user => {
      console.log(`####### USER => `, user);
    });
  }
  googleAuth() {
    this.authService.signInWithGoogle().then(user => {
      console.log(`####### USER => `, user);
    });
  }
}
