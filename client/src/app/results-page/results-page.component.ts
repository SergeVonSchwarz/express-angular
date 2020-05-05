import {Component, OnInit} from '@angular/core';
import jwt_decode from 'jwt-decode';
import {QuizService} from '../shared/services/quiz.service';
import {AuthService} from '../shared/services/auth.service';

@Component({
  selector: 'app-results-page',
  templateUrl: './results-page.component.html',
  styleUrls: ['./results-page.component.css']
})
export class ResultsPageComponent implements OnInit {

  arrForTemplate = Array.from(Array(10)).map((x, i) => i);
  answers: any = null;
  loading: boolean = true;
  getToQuiz: any = null;
  lastAnswer: any = null;

  constructor(private quizService: QuizService, private auth: AuthService) {
  }

  ngOnInit() {
    this.quizService.getAnswers().subscribe((res) => {
      this.loading = false;
      this.answers = res.filter((item) => item.answers.length === 10);
      const userId = jwt_decode(this.auth.getToken()).userId;
      this.lastAnswer = res.find((item) => item._id == userId);
      this.getToQuiz = this.lastAnswer.total < 10 ? true : false;

    });
  }
}
