import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {jwtDecode}  from 'jwt-decode';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private apiUrl = environment.apiUrl;
  
  constructor(private http: HttpClient) { }
  getRandomCity(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/quiz/random-clues`);
  }
  startgame(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/quiz/start-game`);
  }
  checkanswer(body:any):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/quiz/random-clues/checkanswer`,body);
  }

  signup(body:any):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/auth/signup`,body);
  }
  login(identifier: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, {identifier, password });
  }

  saveToken(token: string): void {
    console.log(token);
    localStorage.setItem('jwtToken', token);
  }

  getToken(): string | null {
    return localStorage.getItem('jwtToken');
  }

  logout(): void {
    localStorage.removeItem('jwtToken');
  }

  public getUser(): string | null {
    const jwtToken = this.getToken();
    const decodedToken: any = this.getToken() != null ? jwtDecode(jwtToken as string) : null;
    const user = decodedToken != null ? decodedToken : null;
    return user;
  }
}
