import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Header } from '../header/header';
import { heroTrash, heroPencilSquare } from '@ng-icons/heroicons/outline';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { AsyncPipe, DatePipe } from '@angular/common';
import { Modal } from '../shared/modal/modal';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PostService } from '../../services/post/post-service';
import { TokenService } from '../../services/auth/token-service';

@Component({
  selector: 'app-home',
  imports: [DatePipe, Header, NgIcon, RouterLink, Modal, ReactiveFormsModule, AsyncPipe],
  viewProviders: provideIcons({ heroTrash, heroPencilSquare }),
  templateUrl: './home.html',
  styles: ``,
})
export class Home {
  private tokenService = inject(TokenService);
  private postService = inject(PostService);

  private formBuilder = inject(FormBuilder);

  postAddForm!: FormGroup;
  postUpdateForm!: FormGroup;

  currentUserId = this.tokenService.getUserId();
  posts: Post[] = [];

  ngOnInit() {
    this.fetchPostsForHomePage();
    this.postAddForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      content: ['', Validators.required],
    });

    this.postUpdateForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      content: ['', Validators.required],
    });
  }
  fetchPostsForHomePage() {
      this.postService.getPosts().subscribe((data) => {
        this.posts = data.slice(0, 6);
      });
    }

  modalType = signal<'add' | 'edit' | 'delete' | null>(null);

  editingPostId: number | null = null;
  deletingPostId: number | null = null;

  openModal(type: 'add' | 'edit' | 'delete') {
    this.modalType.set(type);
  }

  modalOpen(type: 'add' | 'edit' | 'delete') {
    return this.modalType() === type;
  }

  onModalClosed() {
    this.modalType.set(null);
    this.editingPostId = null;
    this.deletingPostId = null;
  }

  onModalConfirmedCreatePost() {
    if(!this.postAddForm.valid){
      return;
    }
    this.postService.addPost(this.postAddForm.value).subscribe((data) => {
      if (data) {
        this.fetchPostsForHomePage();
      }
    });
    this.onModalClosed();
  }

  editingPost!: any;

  showEditForm(postId: number) {
    this.editingPostId = postId;
    this.postService.getPostById(postId).subscribe((data) => {
      this.editingPost = data;
      this.postUpdateForm.patchValue({
        title: this.editingPost.title,
        content: this.editingPost.content,
      });
    });
    this.openModal('edit');
  }

  onModalConfirmedUpdatePost() {
    if(!this.postUpdateForm.valid){
      return;
    }
    this.postService.updatePost(this.postUpdateForm.value, this.editingPostId).subscribe((data)=>{
      if(data){
        this.fetchPostsForHomePage();
      }
    })
    this.onModalClosed();
  }

  confirmDelete(postId: number) {
    this.deletingPostId = postId;
    this.openModal('delete');
  }

  onModalConfirmedDeletePost() {
    this.postService.deletePost(this.deletingPostId).subscribe(() => {
        this.fetchPostsForHomePage();
    });
    this.onModalClosed();
  }

  get titleCreate(){
    return this.postAddForm.get('title');
  }
  get contentCreate(){
    return this.postAddForm.get('content');
  }
  get titleUpdate(){
    return this.postUpdateForm.get('title');
  }
  get contentUpdate(){
    return this.postUpdateForm.get('content');
  }
}
