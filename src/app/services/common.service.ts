import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { environment } from 'src/environments/environment';
import * as CryptoJS from 'crypto-js';
@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private apiUrl = environment.apiUrl;
  private secretKey = 'Nirav2204@';
  constructor(private http: HttpClient) { }

  getRandomCity(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/quiz/random-clues`);
  }

  startgame(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/quiz/start-game`);
  }

  checkanswer(body: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/quiz/random-clues/checkanswer`, body);
  }

  
}
