import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { Home } from './components/home/home';
import { authGuard } from './guards/auth-guard';
import { publicGuard } from './guards/public-guard';
import { PostComponent } from './components/post/post';
import { PageNotFound } from './components/page-not-found/page-not-found';
import { PostDetails } from './components/post-details/post-details';

export const routes: Routes = [
  {
    path: '',
    component: Home,
    canActivate: [authGuard],
  },
  {
    path: 'login',
    component: Login,
    title: 'Angular | Login',
    canActivate: [publicGuard],
  },
  {
    path: 'register',
    component: Register,
    canActivate: [publicGuard],
  },
  {
    path: 'posts',
    component: PostComponent,
    canActivate: [authGuard],
  },
  {
    path: 'post/:id',
    component: PostDetails,
  },
  {
    path: '**',
    component: PageNotFound,
  },
];
