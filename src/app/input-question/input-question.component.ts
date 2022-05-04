import { Component, OnInit } from '@angular/core';
import { filter, Observable, of } from 'rxjs';
import { Tag } from '../entity/tag';
import { User } from '../entity/user';
import { QuestionService } from '../services/question.service';
import { UserService } from '../services/user.service';
import { TagModel } from 'ngx-chips/core/tag-model';
import { Question } from '../entity/question';
import { Router } from '@angular/router';

@Component({
  selector: 'app-input-question',
  templateUrl: './input-question.component.html',
  styleUrls: ['./input-question.component.scss'],
})
export class InputQuestionComponent implements OnInit {
  title!: string;
  questionText!: string;
  items!: any[];

  constructor(
    private userService: UserService,
    private questionService: QuestionService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  requestAutocompleteItems = (text: any): Observable<any> => {
    return this.questionService.getQuestionTags();
  }

  onAdding(tag: TagModel): Observable<TagModel> {
    const confirm = window.confirm('Do you really want to add this tag?');
    console.log(this.items);
    return of(tag).pipe(filter(() => confirm));
  }

  onRemoving(tag: any): Observable<TagModel> {
    const confirm = window.confirm('Do you really want to remove this tag?' + 
    tag.text);
    return of(tag).pipe(filter(() => confirm));
  }

  saveQuestion() {
    const question = new Question(this.title, this.questionText, this.createTags());
    this.questionService
      .addQuestion(question)
      .subscribe((res: any) => {
        this.toRouterComponent();
      });
  }

  createTags(): Tag[] {
    const tags: Tag[] = [];
    for (let tagModel of this.items) {
      if (tagModel.tagId && tagModel.text) {
        tags.push(new Tag(tagModel.text, tagModel.tagId));
      } else {
        tags.push(new Tag(tagModel.value));
      }
    }
    return tags;
  }

  toRouterComponent() {
    this.router.navigateByUrl('/home');
  }
}
