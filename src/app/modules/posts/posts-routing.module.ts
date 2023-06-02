import { inject, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResolveFn, RouterModule, Routes } from '@angular/router';
import { PostsComponent } from './posts.component';
import { PostsService } from './posts.service';
import { Post } from 'src/app/common/models/post.model';
import { ProfileComponent } from './profile/profile.component';
import { MySitsComponent } from './my-sits/my-sits.component';
import { NotificationsComponent } from './notifications/notifications.component';

const postsResolver: ResolveFn<Post[]> = () => {
  return inject(PostsService).getPosts();
}


const routes: Routes = [
  {
    path: '',
    component: PostsComponent,
    resolve: { posts: postsResolver }
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'my-sits',
    component: MySitsComponent,
  },
  {
    path: 'notifications',
    component: NotificationsComponent
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class PostsRoutingModule { }
