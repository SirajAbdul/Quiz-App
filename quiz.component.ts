import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from '../shared/quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  constructor( private router : Router, private quizservices: QuizService) { }

  
  ngOnInit() {
    if (parseInt(localStorage.getItem('seconds')) > 0) {
      this.quizservices.seconds = parseInt(localStorage.getItem('seconds'));
      this.quizservices.qnProgress = parseInt(localStorage.getItem('qnProgress'));
      this.quizservices.qns = JSON.parse(localStorage.getItem('qns'));
      if (this.quizservices.qnProgress == 10)
        this.router.navigate(['/result']);
      else
        this.startTimer();
    }
    else {
      this.quizservices.seconds = 0;
      this.quizservices.qnProgress = 0;
      this.quizservices.GetQuestions().subscribe(
        (data: any) => {
          this.quizservices.qns = data;
          this.startTimer();
        }
      );
    }
  }

  startTimer() {
    this.quizservices.timer = setInterval(() => {
      this.quizservices.seconds++;
      localStorage.setItem('seconds', this.quizservices.seconds.toString());
    }, 1000);
  }

  Answer(qID: any, choice: any) {
    this.quizservices.qns[this.quizservices.qnProgress].answer = choice;
    localStorage.setItem('qns', JSON.stringify(this.quizservices.qns));
    this.quizservices.qnProgress++;
    localStorage.setItem('qnProgress', this.quizservices.qnProgress.toString());
    if (this.quizservices.qnProgress == 10) {
      clearInterval(this.quizservices.timer);
      this.router.navigate(['/result']);
    }
  }

}