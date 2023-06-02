import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.authService.signOut();
    this.authService.isAuthenticated().subscribe(res => console.log(res));
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
    this.authService.signInWithFirebase(email, pass).then(user => {
      alert('Logged in successfully');
      console.log(user);
      this.router.navigate(['/posts'])
    }).catch(err => {
      alert('Password or email is wrong please check again');
    })
  }

  facebookAuth() {
    this.authService.signInWithFacebook().then(user => {
      console.log(`####### USER => `, user);
      this.router.navigate(['/posts'])
    });
  }
  googleAuth() {
    this.authService.signInWithGoogle().then(user => {
      console.log(`####### USER => `, user);
      this.router.navigate(['/posts']);
    });
  }
}
