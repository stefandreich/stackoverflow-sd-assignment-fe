import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from '../entity/question';
import { QuestionVoteCounter } from '../entity/question-vote-counter';
import { Tag } from '../entity/tag';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  private apiUrl = 'http://localhost:8080/questions';

  constructor(private http: HttpClient) {}

  getCurrentUser() {
   return localStorage.getItem('loggedUserId');
  };

  addQuestion(question: Question): Observable<Question> {
    return this.http.post<Question>(
      `${this.apiUrl}/addQuestion/${this.getCurrentUser()}`,
      question,
    );
  }

  getAllQuestions(): Observable<Question[]> {
    const url = `${this.apiUrl}/getAllQuestions/${this.getCurrentUser()}`;
    console.log(this.getCurrentUser());
    return this.http.get<Question[]>(url);
  }

  getQuestion(questionId: number): Observable<Question> {
    const url = `${this.apiUrl}/getQuestion/${questionId}/${this.getCurrentUser()}`;
    return this.http.get<Question>(url);
  }

  getQuestionsByTitleAndTags(questionTitle: string): Observable<Question[]> {
    let params = new HttpParams().set('title', questionTitle);
    const url = `${this.apiUrl}/getQuestionsByTitleAndTags/${this.getCurrentUser()}`;
    return this.http.get<Question[]>(url, {params: params});
  }

  getQuestionTags(): Observable<Tag[]> {
    const url = `${this.apiUrl}/getTags`;
    return this.http.get<Tag[]>(url);
  }

  updateQuestion(question: Question): Observable<Question> {
    const url = `${this.apiUrl}/updateQuestion/${this.getCurrentUser()}`;
    return this.http.post<Question>(url, question);
  }

  deleteQuestion(questionId: number): Observable<any> {
    const url = `${this.apiUrl}/deleteQuestion/${questionId}/${this.getCurrentUser()}`;
    return this.http.delete(url);
  }

  setQuestionVotes(questionId: number, vote: boolean): Observable<QuestionVoteCounter> {
    let params = new HttpParams().set('vote', vote);
    const url = `${this.apiUrl}/setQuestionVotes/${questionId}/${this.getCurrentUser()}`;
    return this.http.post<QuestionVoteCounter>(url, {}, {params: params});
  }
}
