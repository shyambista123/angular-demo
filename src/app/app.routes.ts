import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { Home } from './components/home/home';
import { authGuard } from './guards/auth-guard';
import { publicGuard } from './guards/public-guard';

export const routes: Routes = [
    {
        path: '',
        component: Home,
        canActivate: [authGuard]
    },
    {
        path: 'login',
        component: Login,
        title: 'Angular | Login',
        canActivate: [publicGuard]
    },
    {
        path: 'register',
        component: Register,
        canActivate: [publicGuard]
    }
];
