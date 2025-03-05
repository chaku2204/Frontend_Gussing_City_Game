import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { CommonService } from '../services/common.service';
import { Router } from '@angular/router';



const TOKEN_HEADER_KEY = 'Authorization';
@Injectable()
export class JwtInterceptor implements HttpInterceptor {


  constructor(private authService: CommonService,private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.authService.getToken();
    console.log(token);
    if (token) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
        withCredentials: true
      });
      console.log(request);
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
       console.log(error);
         if(error.status==403){
          this.router.navigate(['/auth/login']);
        
         }
         
        return throwError(() => error);
      })
    );;
  }
}
