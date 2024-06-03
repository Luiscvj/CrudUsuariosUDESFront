import { Routes } from '@angular/router';
import { register } from 'module';
import { RegisterComponent } from './Pages/register/register.component';
import { LoginComponent } from './Pages/login/login.component';
import { Component } from '@angular/core';
import { HomeComponent } from './Pages/home/home.component';
import { EditUserComponent } from './Pages/Dialogs/edit-user/edit-user.component';

export const routes: Routes = 
[
    {path:'',component:HomeComponent},
    {path:'login',component:LoginComponent},
    {path:'register',component:RegisterComponent},
    {path:'home',component:HomeComponent},
    //{path:'edit-user.component',component:EditUserComponent}
    
    
];
