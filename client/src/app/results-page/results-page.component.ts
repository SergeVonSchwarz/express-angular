import { Component, OnInit } from '@angular/core';
import {QuizService} from '../shared/services/quiz.service';
import {Answer} from '../shared/interfaces';

@Component({
  selector: 'app-results-page',
  templateUrl: './results-page.component.html',
  styleUrls: ['./results-page.component.css']
})
export class ResultsPageComponent implements OnInit {

  loading = false;
  answers: Answer[] = [];

  constructor(private quizService: QuizService) { }

  ngOnInit() {
    this.loading = true;
    this.quizService.fetch().subscribe(answers => {
      this.loading = false;
      this.answers = answers;
      console.log('Answers: ', answers);
    });
  }

}
