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

  baseUrl: string = 'http://127.0.0.1:3000/api/users'

  login(body: string): Observable<TokenResponse> {
    let headers = new HttpHeaders({'Content-Type': 'application/json'}); // ... Set content type to JSON
    return this.http.post<any>(this.baseUrl + '/login', body, {headers}) as Observable<TokenResponse>;
  }

}
