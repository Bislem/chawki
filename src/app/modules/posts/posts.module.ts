import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsComponent } from './posts.component';
import { PostsRoutingModule } from './posts-routing.module';
import { MatTableModule } from '@angular/material/table';
import { PostDialogComponent } from './post-dialog/post-dialog.component'
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { PipesModule } from 'src/app/common/pipes/pipes.module';
import { ProfileComponent } from './profile/profile.component';
import { MySitsComponent } from './my-sits/my-sits.component';
import { NotificationsComponent } from './notifications/notifications.component';


@NgModule({
  declarations: [
    PostsComponent,
    PostDialogComponent,
    ProfileComponent,
    MySitsComponent,
    NotificationsComponent,
  ],
  imports: [
    CommonModule,
    PostsRoutingModule,
    MatTableModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    PipesModule,
    MatListModule
  ]
})
export class PostsModule { }
