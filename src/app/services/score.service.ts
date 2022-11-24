import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {TokenResponse} from "../_models/TokenResponse";
import {ScoreList} from "../_models/ScoreList";

@Injectable({
  providedIn: 'root'
})
export class ScoreService {

  constructor(
    private http: HttpClient
  ) {
  }

  baseUrl: string = 'https://speed-type-game-backend-production.up.railway.app/api/scores'

  setScore(body: string): Observable<TokenResponse> {
    let bearerToken = localStorage.getItem('token')
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${bearerToken}`
    }); // ... Set content type to JSON
    return this.http.post<any>(this.baseUrl + '/set-score', body, {headers}) as Observable<TokenResponse>;
  }

  getScore(): Observable<ScoreList> {
    return this.http.get(this.baseUrl + '') as Observable<ScoreList>;
  }
}
