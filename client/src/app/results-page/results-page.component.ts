import { Component, OnInit } from '@angular/core';
import {QuizService} from '../shared/services/quiz.service';
import {Answer} from '../shared/interfaces';
import {Observable} from 'rxjs/index';

@Component({
  selector: 'app-results-page',
  templateUrl: './results-page.component.html',
  styleUrls: ['./results-page.component.css']
})
export class ResultsPageComponent implements OnInit {

  answers$: Observable<Answer[]>;

  constructor(private quizService: QuizService) { }

  ngOnInit() {
    this.answers$ = this.quizService.fetch();
  }

}
