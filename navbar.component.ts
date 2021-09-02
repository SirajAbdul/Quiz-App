import { Component, OnInit } from '@angular/core';
import { QuizService } from '../shared/quiz.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private quizservices:QuizService,private router:Router) { }

  ngOnInit(): void {
  }
  SignOut() {
    localStorage.clear();
    clearInterval(this.quizservices.timer);
    this.router.navigate(['/register']);
  }
}
