import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/common/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
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
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      displayName: new FormControl(null, Validators.required),
    });
  }

  register() {
    if (this.authForm.invalid) {
      alert('please fill the form correctly');
      return;
    }
    const { email, displayName, password } = this.authForm.value;
    this.authService.createUser(email, password).then(res => {
      res.user?.updateProfile({ displayName }).then(res => {
        alert('account created successfully !');
        this.router.navigate(['/', 'posts']);
      })
    })
  }
}
