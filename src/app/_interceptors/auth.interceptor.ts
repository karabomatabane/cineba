import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private readonly authToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0N2U1MjcyODUxMDZlODNiNDIyYjYzYWM4OTVlZDQwYiIsInN1YiI6IjY0Zjc1ODEwMWI3MjJjMDExZGNkNWJmZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.EkXdtw-DX4RTRLuJMl5qU_9b1EbXAmiY5NCOc5bqRFc';

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Clone the request and add the Authorization header with the Bearer token
    const authRequest = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.authToken}`
      }
    });

    return next.handle(authRequest);
  }
}