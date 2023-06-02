import { CommonModule } from '@angular/common';
import { inject, NgModule } from '@angular/core';
import { redirectLoggedInTo, redirectUnauthorizedTo, canActivate } from '@angular/fire/compat/auth-guard';
import { BrowserModule } from '@angular/platform-browser';
import { ResolveFn, RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthService } from './common/auth/auth.service';

const redirectLoggedInToHome = () => redirectLoggedInTo(['/posts']);
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['/auth']);


const authresovlver: ResolveFn<firebase.default.User | null> = () => {
  return inject(AuthService).getCurrentUser();
}

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    resolve: { user: authresovlver },
    children: [
      {
        path: 'auth',
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
        ...canActivate(redirectLoggedInToHome)
      },
      {
        path: 'posts',
        loadChildren: () => import('./modules/posts/posts.module').then(m => m.PostsModule),
        ...canActivate(redirectUnauthorizedToLogin)
      },
      {
        path: '**',
        redirectTo: 'posts'
      }
    ]
  },
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
