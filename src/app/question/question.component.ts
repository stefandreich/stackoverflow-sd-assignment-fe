import { Component, Input, OnInit } from '@angular/core';
import { Question } from '../entity/question';
import { QuestionVoteCounter } from '../entity/question-vote-counter';
import { AnswerService } from '../services/answer.service';
import { QuestionService } from '../services/question.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Answer } from '../entity/answer';
import { AnswerVoteCounter } from '../entity/answer-vote-counter';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnInit {
  question!: Question;
  newAnswer!: string;

  constructor(
    private questionService: QuestionService,
    private answerService: AnswerService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadQuestion();
  }

  loadQuestion(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.questionService
        .getQuestion(params['questionId'])
        .subscribe((res: Question) => {
          console.log(res);
          this.question = res;
        });
    });
  }

  voteQuestion(vote: boolean) {
    this.questionService
      .setQuestionVotes(this.question.questionId, vote)
      .subscribe((resultVote: QuestionVoteCounter) => {
        this.question.currentUserVote = resultVote.currentUserVote;
        this.question.posVotes = resultVote.posVotes;
        this.question.negVotes = resultVote.negVotes;
      });
  }

  voteAnswer(vote: boolean, answer: Answer) {
    this.answerService
      .setAnswerVotes(answer.answerId, vote)
      .subscribe((resultVote: AnswerVoteCounter) => {
        answer.currentUserVote = resultVote.currentUserVote;
        answer.posVotes = resultVote.posVotes;
        answer.negVotes = resultVote.negVotes;
      });
  }

  isSameUser(userId: number) {
    return userId.toString() === localStorage.getItem('loggedUserId');
  }

  deleteAnswer(answerId: number) {
    this.answerService.deleteAnswer(answerId).subscribe((res) => {
      this.question.answers = this.question.answers.filter(
        (ans) => ans.answerId !== answerId
      );
    });
  }

  deleteQuestion(questionId: number) {
    this.questionService.deleteQuestion(questionId).subscribe((res) => {
      this.router.navigateByUrl('/home');
    });
  }

  saveAnswer() {
    const answer = new Answer(this.newAnswer, this.question);
    this.answerService.addAnswer(answer).subscribe((res: any) => {
      this.loadQuestion();
      this.newAnswer = '';
    });
  }

  editAnswer(answer: Answer) {
    answer.question = this.copyQuestion();
    this.answerService.updateAnswer(answer).subscribe((ans: Answer) => {
      answer = ans;
    });
  }

  copyQuestion(): Question {
    const copyQuestion = new Question(
      this.question.title,
      this.question.questionText,
      this.question.tags
    );
    copyQuestion.questionId = this.question.questionId;
    copyQuestion.questionDateCreated = this.question.questionDateCreated;
    copyQuestion.user = this.question.user;

    return copyQuestion;
  }

  editQuestion(): void {
    this.questionService
      .updateQuestion(this.question)
      .subscribe((q: Question) => {
        this.question = q;
      });
  }
}
