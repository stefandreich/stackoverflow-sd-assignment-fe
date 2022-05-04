import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../entity/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:8080/users';

  constructor(private http: HttpClient) {}

  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl + '/addUser', user);
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl + '/getAllUsers');
  }

  getUser(userId: number): Observable<User> {
    const url = `${this.apiUrl}/getUser/${userId}`;
    return this.http.get<User>(url);
  }

  getUserByUsername(username: string): Observable<User> {
    let params = new HttpParams().set('username', username);
    return this.http.get<User>(this.apiUrl + '/getUserByUsername', {params: params});
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(this.apiUrl + '/updateUser', user);
  }

  deleteUser(userId: number) {
    const url = `${this.apiUrl}/deleteUser/${userId}`;
    this.http.delete(url);
  }
}
