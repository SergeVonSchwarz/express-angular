import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Answer} from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  constructor(private http: HttpClient) {}

  getAnswers() {
    return this.http.get<Answer[]>('/api/answers');
  }
}
