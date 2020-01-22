import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppComponent } from '../../app.component';
import { AlertService } from '../../_services/alert.service';
import { AuthenticationService } from '../../_services/authentication.service';
import { FormBuilder, FormGroup, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css'],
  providers: [AuthenticationService]
})
export class LogInComponent implements OnInit {
  // router: any;
  createForm: FormGroup;
  emailRegex = '[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';

  constructor(public fb: FormBuilder,
              private router: Router,
              private comp:AppComponent,
              private alertService: AlertService,
              private Authentication: AuthenticationService,
              private toastr: ToastrService
              ) { }

  ngOnInit() {
    this.Authentication.logout();
    this.initializelForm();
  }
  initializelForm() {
    this.createForm = this.fb.group({
      username: ["", [Validators.required, Validators.pattern('[a-zA-Z]+')]],
      // Email: ["", [Validators.required, Validators.pattern(this.emailRegex)]],
      password: ["", [Validators.required, Validators.pattern('[a-zA-Z0-9]+'), Validators.maxLength(7)]],
    });
  }

  Create(val) {
    // debugger
    // console.log(val.username == "admin");
    let Data = {
      "username": val.username,
      "password": val.password,
      // "created_by": localStorage.getItem('UserFullName')
    };
    if(val.username == "admin"){
      alert('wc admin');
      this.router.navigate(['/admin-dashboard']);      
    }
    else if(val.username == "user" && val.password == "user"){
      alert('wc user');
      this.router.navigate(['/user-dashboard']);
    }
    else if(Data){
    this.Authentication.login( val.username,val.password)
      .subscribe(
        Create => {
          // alert('success');
          //this.loginDetails = JSON.stringify(login);
          // console.log(Create);
          if (!Create) {
            alert('Username or password is incorrect');
            // this.messageService.add({ severity: 'success', summary: 'Create Company', detail: 'You have created company succesfully' });

          }
          else if (Create) {
            // alert('Success');
            // this.spinnerService.hide();
            // this.messageService.add({ severity: 'error', summary: 'Create Company', detail: 'Error Occured while creating' });
            setTimeout(() => {
              this.router.navigate(['/dashboard'])
            }, 100);
          }
        },
        // error => this.alertService.error = <any>error);
        error => this.toastr.error('Username or password is incorrect', 'Retry'));
        
      }else {
        alert('Username or password is incorrect');
      }

  }

  login(){
    alert('success');
    // this.router.navigate(['/dashboard']);
    this.comp.onLoginSuccess(event);
  }
  // onLoginSuccess($event) {
  //   // debugger
  //   console.log('Successful login: ' + $event.value);

  //   // Now, navigate somewhere...
  //   this.router.navigate(['/dashboard']);
  // }

}
