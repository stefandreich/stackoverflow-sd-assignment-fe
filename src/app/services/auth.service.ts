import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { User } from '../entity/user';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080';
  private isLoggedIn$ = new Subject<boolean>();

  constructor(private http: HttpClient) {}

  loginUser(username: string, password: string): Observable<boolean> {
    let params = new HttpParams()
      .set('username', username)
      .set('password', password);

    this.http.get<User>(this.apiUrl + '/login', { params: params }).subscribe(
      (user: User) => {
        localStorage.setItem('loggedUserId', user.userId.toString());
        this.isLoggedIn$.next(true);
      },
      (err: HttpErrorResponse) => {
        alert(err.error);
        console.log(err);
        this.isLoggedIn$.next(false);
      }
    );

    return this.isLoggedIn$.asObservable();
  }

  signupUser(user: User): Observable<boolean> {
    this.http.post<User>(this.apiUrl + '/users/addUser', user).subscribe(
      (user: User) => {
        localStorage.setItem('loggedUserId', user.userId.toString());
        this.isLoggedIn$.next(true);
      },
      (err: HttpErrorResponse) => {
        alert(err.error);
        console.log(err);
        this.isLoggedIn$.next(false);
      }
    );

    return this.isLoggedIn$.asObservable();
  }
}
