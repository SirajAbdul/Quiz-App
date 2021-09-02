import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from '../shared/quiz.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

  constructor(private quizSerivce: QuizService,private route : Router) { }

  ngOnInit(): void {
  }
  OnSubmit(email:string,password:string){
    this.quizSerivce.insertParticipant(email,password).subscribe(
      (data : any)=>{
        localStorage.clear();
        localStorage.setItem('participant',JSON.stringify(data));
        this.route.navigate(['/quiz']);
      }
    );

  }

}
