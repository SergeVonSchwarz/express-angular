import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Answer, User} from '../interfaces';
import {Observable} from 'rxjs/index';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  constructor(private http: HttpClient) {}

  fetch(): Observable<any> {
    return this.http.get<Answer[]>('/api/answers');
  }
}
