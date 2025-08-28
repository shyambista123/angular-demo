import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { heroTrash, heroPencilSquare, heroCalendar, heroUser, heroClock } from '@ng-icons/heroicons/outline';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { DatePipe } from '@angular/common';
import { Header } from '../header/header';
import { PostService } from '../../services/post/post-service';

@Component({
  selector: 'app-post-details',
  imports: [DatePipe, Header, NgIcon, RouterLink],
  viewProviders: provideIcons({ heroTrash, heroPencilSquare, heroCalendar, heroUser, heroClock }),
  templateUrl: './post-details.html',
  styles: ``
})
export class PostDetails {
post!: Post;

  private service = inject(PostService);
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      this.service.getPostById(param['id']).subscribe((data) => {
        this.post = data
      });
    })
  }
}
