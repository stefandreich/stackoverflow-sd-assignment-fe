import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../entity/user';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  username!: string;
  email!: string;
  password!: string;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  signupUser() {
    const user = new User(this.username, this.email, this.password);
    this.authService
      .signupUser(user)
      .subscribe((isLoggedIn: boolean) => {
        if (isLoggedIn === true) {
          this.toRouterComponent();
        }
      });
  }

  toLoginComponent() {
    this.router.navigateByUrl('/login');
  }

  toRouterComponent() {
    this.router.navigateByUrl('/home');
  }

}
