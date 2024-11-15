import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from '../../auth/login';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  login: Login = new Login();

  router = inject(Router);

  constructor(){}


}
