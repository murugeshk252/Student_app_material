import { Component, OnInit } from '@angular/core';
import { UserService } from '../../_services/user.service';
import { AlertService } from '../../_services/alert.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Option, Question, Quiz, QuizConfig } from '../../_quiz-models/index';
import { QuizService } from '../../_services/quiz.service';
import { QuizurlService } from '../../_services/quizurl.service';
import { ToastrService } from 'ngx-toastr';
export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}
export interface Languages {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [QuizService,QuizurlService]
})
export class DashboardComponent implements OnInit {
  user_id:any;
  id:any;
  username:any;
  user;
  listDetails;
  list:any;
  data: any;
  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  selectedValue: string;
  Languages: Languages[] = [
    {value: 'HTML', viewValue: 'Html'},
    {value: 'CSS', viewValue: 'Css'},
    {value: 'ANGULAR', viewValue: 'Angular'}
  ];
  startTime: Date;
  quizName: string;
  
  quizName1: string;
  option_name: string;
  quiz: Quiz = new Quiz(null);
  quiz1: Quiz = new Quiz(null);
  mode = 'quiz';
  quizes: any[];
  quizes1: any[];
  ellapsedTime = '00:00';
  config: QuizConfig = {
    'allowBack': true,
    'allowReview': true,
    'autoMove': false,  // if true, it will move to next question automatically when answered.
    'duration': 900,  // indicates the time (in secs) in which quiz needs to be completed. 0 means unlimited.
    'pageSize': 1,
    'requiredAll': false,  // indicates if you must answer all the questions before submitting.
    'richText': false,
    'shuffleQuestions': false,
    'shuffleOptions': false,
    'showClock': false,
    'showPager': true,
    'theme': 'none'
  };
  timer: any = null;
  duration = '';
  progersbarvalue= 100;
  pager = {
    index: 0,
    size: 1,
    count: 1
  };
  url='java.json';

  constructor(private UserService: UserService,
              private alertService: AlertService,
              private formBuilder: FormBuilder,
              private quizService: QuizService,
              private QuizurlService: QuizurlService,
              private toastr: ToastrService
              ) { }

  ngOnInit() {
    // this.QuizUrlService();
    this.UserList();
    this.firstFormGroup = this.formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this.formBuilder.group({
      secondCtrl: [''],
    });
    this.quizes = this.quizService.getAll();
    // this.quizes1 = this.quizService.get(url1);
    // this.quizName = this.quizes1[0].id;
    this.quizName = this.quizes[0].id;
    this.loadQuiz(this.quizName);
  }

  QuizUrlService(){
    this.QuizurlService.QuizService().subscribe(
      (res:any) => {
        this.quizName1=res.questions;
        this.pager.count = this.quiz1.questions.length;
        console.log(this.quizName1);
      } 
    );this.mode = 'quiz';
  }

  loadQuiz(quizName: string) {
    this.quizService.get(quizName).subscribe(res => {
      this.quiz = new Quiz(res);
      this.pager.count = this.quiz.questions.length;
      // this.startTime = new Date();
      this.ellapsedTime = '00:00';
      // this.timer = setInterval(() => { this.tick(); }, 1000);
      this.duration = this.parseTime(this.config.duration);
    });
    this.mode = 'quiz';
  }

  startquiz(){
    // debugger
    this.startTime = new Date();
    this.timer = setInterval(() => { this.tick(); }, 1000);
    console.log(this.timer);
  }

  tick() {
    const now = new Date();
    const diff = (now.getTime() - this.startTime.getTime()) / 1000;
    if (diff >= this.config.duration) {
      this.onSubmit();
    }
    this.ellapsedTime = this.parseTime(diff);
  }
  onSubmit() {
    debugger
    let answers = [];
    this.quiz.questions.forEach(x => answers.push({ 'quizId': this.quiz.id, 'questionId': x.id, 'answered': x.options  }));

    // Post your data to the server here. answers contains the questionId and the users' answer.
    console.log(this.quiz.questions);
    this.mode = 'result';
  }

  parseTime(totalSeconds: number) {
    let mins: string | number = Math.floor(totalSeconds / 60);
    let secs: string | number = Math.round(totalSeconds % 60);
    mins = (mins < 10 ? '0' : '') + mins;
    secs = (secs < 10 ? '0' : '') + secs;
    return `${mins}:${secs}`;
  }

  get filteredQuestions() {
    return (this.quiz.questions) ?
      this.quiz.questions.slice(this.pager.index, this.pager.index + this.pager.size) : [];
  }
  get filteredQuestions1() {  
    return (this.quizName1) ?
      this.quizName1.slice(this.pager.index, this.pager.index + this.pager.size) : [];
  }

  onSelect(question: Question, option: Option) {
    debugger
    if (question.questionTypeId === 1) {
      question.options.forEach((x) => { if (x.id !== option.id) x.selected = false; });
      console.log(question.options);
    }

    if (this.config.autoMove) {
      this.goTo(this.pager.index + 1);
    }
  }
  goTo(index: number) {
    debugger
    if (index >= 0 && index < this.pager.count) {
      this.pager.index = index;
      this.mode = 'quiz';
    }
  }

  userdata(){
    this.user_id = localStorage.getItem('Email');
    // console.log(this.user_id);
  }

  UserList() {
    // this._id = "5df4ae1c7edec215349fc195";
    let user = JSON.parse(localStorage.getItem('currentUser'));
    this.id = user["_id"];
    this.username = user["username"];
    this.toastr.success('Login Success', 'Welcome' +' '+ this.username);
    debugger
    this.UserService.getById(this.id)
      .subscribe(
        list => {
          
          this.listDetails = JSON.stringify(list);
          console.log(list);
          if (list) {
            this.data = this.listDetails;
            // this.cList = this.listDetails;
            // this.source= new LocalDataSource( this.data )
          }
          // else {
          //   //alert("sds");
          //   this.listFailureFeedback = true;
          //   this.error = true;            
          //   setTimeout(()=>{
          //     this.listFailureFeedback = false;
          //     this.error = false;
          //   }, 3000);        
          // }
        },
        error => this.alertService.error = <any>error);
  }

}
