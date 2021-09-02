import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  readonly rootUrl = "https://localhost:44393/";
  qns: any[] | undefined;
  seconds: number | undefined;
  timer: NodeJS.Timeout | undefined;
  qnProgress:number | undefined;
  correctAnswerCount: number=0;

  constructor(private http : HttpClient) { }


  insertParticipant(email: string, password: string) {
    var body = {
      email: email,
      password: password
    }
    return this.http.post(this.rootUrl + '/api/InsertParticipant', body);
  }
  GetQuestions(){
    return this.http.get(this.rootUrl + '/api/Questions');
  }
  
  getAnswers() {
    var body = this.qns.map(x => x.QnID);
    return this.http.post(this.rootUrl + '/api/Answers', body);
  }

  submitScore() {
    var body = JSON.parse(localStorage.getItem('participant'));
    body.Score = this.correctAnswerCount;
    body.TimeSpent = this.seconds;
    return this.http.post(this.rootUrl + "/api/UpdateOutput", body);
  }
}
