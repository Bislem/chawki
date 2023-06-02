import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent
  }
]


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
  exports: [
    RouterModule
  ]
})
export class AuthModule { }
