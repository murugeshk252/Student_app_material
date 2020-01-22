import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuizurlService {

  constructor(private httpClient: HttpClient) { }

  public jsonplaceholderUrl =  '../assets/data/javascript.json';
  QuizService(): Observable<DashboardComponent[]> {

    
    return this.httpClient.get<any>(this.jsonplaceholderUrl);
    // return this.httpClient.post<any>(this.CreateAssetUrl, JSON.stringify(cData), httpOptions)
    //               .pipe(catchError(this.handleError));
    
  }
}
