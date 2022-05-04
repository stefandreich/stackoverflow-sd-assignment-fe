import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { User } from './entity/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title: string = 'StackOverflow';
  user!: User;

  constructor(private titleService: Title, private router: Router) {}

  items!: MenuItem[];

  ngOnInit() {
    this.titleService.setTitle(this.title);

    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        command: () => this.toHomeComponent()
      },
      {
        label: 'Add a question',
        icon: 'pi pi-plus',
        command: () => this.toAddQuestionComponent()
      }
    ];
  }

  toAddQuestionComponent(): void {
    this.router.navigateByUrl('/add-question');
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('loggedUserId') !== null;
  }

  logoutUser() {
    localStorage.removeItem('loggedUserId');
    this.toRouterComponent();
  }

  toRouterComponent() {
    this.router.navigateByUrl('/login');
  }

  toHomeComponent() {
    this.router.navigateByUrl('/home');
  }
}
