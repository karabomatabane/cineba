import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../_services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private readonly tmdbToken = environment.tmdbToken;

  constructor(private authService: AuthService) {}
  private readonly defaultToken = this.authService.getToken();

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Check if it's the specific request that needs a custom token
    if (request.url.includes(environment.tmdbUrl)) {
      // Clone the request and add the Authorization header with the custom token
      const authRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.tmdbToken}`
        }
      });

      return next.handle(authRequest);
    }

    // For other requests, use the default token
    const authRequest = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.defaultToken}`
      }
    });

    return next.handle(authRequest);
  }
}
