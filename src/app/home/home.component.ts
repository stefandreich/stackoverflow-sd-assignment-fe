import { AfterViewInit, Component } from '@angular/core';
import { Question } from '../entity/question';
import { AnswerService } from '../services/answer.service';
import { QuestionService } from '../services/question.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements AfterViewInit {
  questionList!: Question[];
  searchTitle!: string;

  constructor(
    private questionService: QuestionService,
    private answerService: AnswerService,
    private router: Router
  ) {}

  ngAfterViewInit(): void {
    this.questionService
      .getAllQuestions()
      .subscribe((questions: Question[]) => {
        this.questionList = questions;
      });
  }

  onSubmit() {
    this.questionService
      .getQuestionsByTitleAndTags(this.searchTitle)
      .subscribe((questions: Question[]) => {
        this.questionList = questions;
      });
  }

  navigateToQuestion(questionId: number) {
    this.router.navigateByUrl(`/question/${questionId}`);
  }
}
