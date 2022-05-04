import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Answer } from '../entity/answer';
import { AnswerVoteCounter } from '../entity/answer-vote-counter';

@Injectable({
  providedIn: 'root',
})
export class AnswerService {
  private apiUrl = 'http://localhost:8080/answers';

  constructor(private http: HttpClient) {}

  getCurrentUser() {
    return localStorage.getItem('loggedUserId');
  }

  addAnswer(answer: Answer): Observable<Answer> {
    const url = `${this.apiUrl}/addAnswer/${this.getCurrentUser()}`;
    return this.http.post<Answer>(url, answer);
  }

  getAllAnswers(): Observable<Answer[]> {
    const url = `${this.apiUrl}/getAllAnswers/${this.getCurrentUser()}`;
    return this.http.get<Answer[]>(url);
  }

  getAnswer(answerId: number): Observable<Answer> {
    const url = `${this.apiUrl}/getAnswer/${answerId}/${this.getCurrentUser()}`;
    return this.http.get<Answer>(url);
  }

  updateAnswer(answer: Answer): Observable<Answer> {
    const url = `${this.apiUrl}/updateAnswer/${this.getCurrentUser()}`;
    return this.http.post<Answer>(url, answer);
  }

  deleteAnswer(answerId: number): Observable<any> {
    const url = `${
      this.apiUrl
    }/deleteAnswer/${answerId}/${this.getCurrentUser()}`;
    return this.http.delete(url);
  }

  setAnswerVotes(
    answerId: number,
    vote: boolean
  ): Observable<AnswerVoteCounter> {
    let params = new HttpParams().set('vote', vote);
    const url = `${
      this.apiUrl
    }/setAnswerVotes/${answerId}/${this.getCurrentUser()}`;
    return this.http.post<AnswerVoteCounter>(url, {}, { params: params });
  }
}
