import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {
  private apiUrl = environment.apiUrl;
  private secretKey = 'Nirav2204@';
  constructor(private http: HttpClient) { }
  signup(body: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/signup`, body);
  }

  login(identifier: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, { identifier, password });
  }

  saveToken(token: string): void {
    localStorage.setItem('jwtToken', this.encryptData(token));
  }

  getToken(): string | null {
    return this.decryptData(localStorage.getItem('jwtToken'));
  }

  logout(): void {
    localStorage.removeItem('jwtToken');
  }
  private encryptData(data: any): string {
    return CryptoJS.AES.encrypt(JSON.stringify(data), this.secretKey).toString();
  }

  private decryptData(encryptedData: any): any {
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedData, this.secretKey);
      return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    } catch (error) {
      return null;
    }
  }
  public getUser(): string | null {
    const jwtToken = this.getToken();
    const decodedToken: any = this.getToken() != null ? jwtDecode(jwtToken as string) : null;
    const user = decodedToken != null ? decodedToken : null;
    console.log(user);
    return user;
  }

}
