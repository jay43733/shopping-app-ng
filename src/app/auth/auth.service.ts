import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user.model';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

interface AuthResponseData {
  user: number;
  exp: any;
  token: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  user = new BehaviorSubject<User>(null);

  tokenExpirationTimer: any;

  signup(signupForm: { email: string; password: string }) {
    return this.http
      .post<AuthResponseData>('http://localhost:3300/auth/register', signupForm)
      .pipe(
        catchError((error) => throwError(error)),
        tap((response) => {
          const userVerified = new User(
            response.user,
            response.exp,
            response.token
          );
          this.user.next(userVerified);
          const expirationDuration = response.exp * 1000 - new Date().getTime();
          this.autoLogout(expirationDuration);
          localStorage.setItem('userData', JSON.stringify(response));
        })
      );
  }

  login(loginForm: { email: string; password: string }) {
    return this.http
      .post<AuthResponseData>('http://localhost:3300/auth/login', loginForm)
      .pipe(
        catchError((error) => throwError(error)),
        tap((response) => {
          console.log(response);
          const userVerified = new User(
            response.user,
            response.exp,
            response.token
          );
          const expirationDuration = response.exp * 1000 - new Date().getTime();

          if (expirationDuration > 0) {
            this.user.next(userVerified);

            this.autoLogout(expirationDuration);
          } else {
            this.logout();
          }
          localStorage.setItem('userData', JSON.stringify(response));
        })
      );
  }

  autoLogin() {
    const userData: AuthResponseData = JSON.parse(
      localStorage.getItem('userData')
    );
    if (!userData) return;

    const loadedUser = new User(userData.user, userData.exp, userData.token);

    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration = userData.exp * 1000 - new Date().getTime();
      console.log(expirationDuration);
      this.autoLogout(expirationDuration);
    }
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);

    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expireTime: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expireTime);
  }
}
