import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Std-app';
  
  constructor(private router: Router) {}
  
  ngOnInit(){

  }
  onLoginSuccess($event) {
    // debugger
    console.log('Successful login: ' + $event.value);

    // Now, navigate somewhere...
    this.router.navigate(['/dashboard']);
    return true;
  }
}
