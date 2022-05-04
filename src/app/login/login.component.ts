import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  username!: string;
  password!: string;

  constructor(
    private primengConfig: PrimeNGConfig,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }

  loginUser() {
    this.authService
      .loginUser(this.username, this.password)
      .subscribe((isLoggedIn: boolean) => {
        if (isLoggedIn === true) {
          alert('Welcome ' + this.username);
          this.toRouterComponent();
        }
      });
  }

  toRouterComponent() {
    this.router.navigateByUrl('/home');
  }

  toRegistrationForm() {
    this.router.navigateByUrl('/register');
  }
}
