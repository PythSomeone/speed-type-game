import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {TokenResponse} from "../_models/TokenResponse";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) {
  }

  baseUrl: string = 'https://speed-type-game-backend-production.up.railway.app/api/users'

  login(body: string): Observable<TokenResponse> {
    let headers = new HttpHeaders({'Content-Type': 'application/json'}); // ... Set content type to JSON
    return this.http.post<any>(this.baseUrl + '/login', body, {headers}) as Observable<TokenResponse>;
  }

  register(body: string): Observable<TokenResponse> {
    let headers = new HttpHeaders({'Content-Type': 'application/json'}); // ... Set content type to JSON
    return this.http.post<any>(this.baseUrl + '/register', body, {headers}) as Observable<TokenResponse>;
  }
}
