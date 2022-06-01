import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ShowProfileComponent } from './components/show-profile/show-profile.component';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
  { path: '', redirectTo: '/profile', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ShowProfileComponent, canActivate: [AuthGuard] }]; // visit home only if authenticate

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
