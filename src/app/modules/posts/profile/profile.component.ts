import { Component, OnInit } from '@angular/core';
import { FormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/common/auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: firebase.default.User | null = null;
  userForm!: UntypedFormGroup;


  PWD_HANDLE = "#&%@!!#%!??!";

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }


  ngOnInit() {
    this.user = this.auth.currentUser.getValue();
    this.userForm = new UntypedFormGroup({
      displayName: new FormControl(this.user?.displayName, Validators.required),
      email: new FormControl(this.user?.email, [Validators.required, Validators.email]),
      password: new FormControl(this.PWD_HANDLE, [Validators.required])
    })
  }

  updateProfile() {
    if (!this.userForm.valid) {
      alert('please fill the form first.')
      return;
    }
    const pass = this.userForm.value.password;
    this.auth.updateDisplayName(this.userForm.value.displayName)?.then(res => {
      console.log(res);
      alert('name updated successfully');
      
      if (pass !== this.PWD_HANDLE) {
        this.user?.updatePassword(pass).then(res1 => {
          alert('password updated successfully');
          console.log(res1);
          if (this.user?.email !== this.userForm.value.email) {
            this.user?.updateEmail(this.userForm.value.email).then(res2 => {
              console.log(res2);
              alert('email updated')
            })
          }
        });
      }else{
        if (this.user?.email !== this.userForm.value.email) {
          this.user?.updateEmail(this.userForm.value.email).then(res2 => {
            console.log(res2);
            alert('email updated')
          })
        }
      }

    })
  }

  verifyEmail() {
    this.auth.sendEmailValidation();
  }

  logout() {
    this.auth.signOut().then(res => {
      this.router.navigate(['/auth'])
    });
  }
}