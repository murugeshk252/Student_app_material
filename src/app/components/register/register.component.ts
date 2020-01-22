import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';

import { AlertService } from '../../_services/alert.service';
import { Router } from '@angular/router';
import { UserService } from '../../_services/user.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers:[]
})
export class RegisterComponent implements OnInit {

  Roles: any = ['Admin', 'Author', 'Reader'];
  createForm: FormGroup;
  emailRegex = '[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'
  websiteRegex = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,})/;

  constructor(public fb: FormBuilder,
              private alertService: AlertService,
              private router: Router,
              private UserService: UserService) { }

  ngOnInit() {
    this.initializelForm();
  }
  initializelForm() {
    this.createForm = this.fb.group({
      username: ["", [Validators.required, Validators.pattern('[a-zA-Z]+')]],
      Email: ["", [Validators.required, Validators.pattern(this.emailRegex)]],
      password: ["", [Validators.required, Validators.pattern('[a-zA-Z0-9]+'), Validators.maxLength(7)]],
      
    });
  }

  Create(val) {
    let Data = {
      "username": val.username,
      "Email": val.Email,
      "password": val.password,
    };

    // console.log(Data);
    this.UserService.create(Data)
      .subscribe(
        Create => {
          if (Create['message'] == "SUCCESS") {
            alert('success');
            setTimeout(() => {
              this.router.navigate(['/login'])
            }, 1000);

          }
          else if (Create['message'] == "FAILURE") {
            alert('FAILURE');
          }
          else if (Create['message'] == "EXISTS") {
          }
        },
        error => this.alertService.error = <any>error);

  }

}
