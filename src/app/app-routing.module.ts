import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './common/auth/auth.guard';
import { GuestGuard } from './common/auth/guest.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
    canActivate: [GuestGuard]
  },
  {
    path: 'posts',
    loadChildren: () => import('./modules/posts/posts.module').then(m => m.PostsModule),
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: 'auth'
  }
];



@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
  ]
})
export class AppRoutingModule { }
