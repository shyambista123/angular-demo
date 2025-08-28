import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { DatePipe } from '@angular/common';
import { Header } from '../header/header';
import { heroTrash, heroPencilSquare } from '@ng-icons/heroicons/outline';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { RouterLink } from '@angular/router';
import { PostService } from '../../services/post/post-service';

@Component({
  selector: 'app-post',
  imports: [DatePipe, Header, NgIcon, RouterLink],
  viewProviders: provideIcons({ heroTrash, heroPencilSquare }),
  templateUrl: './post.html',
  styles: ``,
})
export class PostComponent {
  private postService = inject(PostService);
  confirmDelete(_t8: any) {
    console.log('confirm delete');
  }
  showEditForm(_t8: any) {
    console.log('edit');
  }
  currentUserId = signal<number>(4);

  posts: Post[] = [];

  ngOnInit() {
    this.postService.getPosts().subscribe((data) => {
      this.posts = data;
    });
  }
}
