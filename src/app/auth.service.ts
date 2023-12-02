import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { User, login } from './user';

import { Router } from '@angular/router';
import { EmailService } from './email.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  capitalizedEmail: string = '';
  // status: string = '';

  status = new EventEmitter<boolean>(false);
  roleName: string = '';
  userName: string = '';
  email: string = '';
  userId: string = '';
  constructor(
    private http: HttpClient,
    private router: Router,
    private emailService: EmailService
  ) {}

  // Login(loginData: User) {
  //   this.http
  //     .post('http://localhost:8080/login', loginData, { responseType: 'text' })
  //     .subscribe((response: string) => {
  //       if (response === 'login successfully') {
  //         this.status.emit(false);
  //         if (loginData.email.endsWith('@gmail.com')) {
  //           this.router.navigate(['home']);
  //           // this.role.emit(false);
  //           this.roleName = 'user';
  //           localStorage.setItem('role', this.roleName);

  //           this.email = loginData.email;
  //           localStorage.setItem('email', this.email);
  //         } else if (loginData.email.endsWith('@digital-edify.com')) {
  //           this.router.navigate(['dashboard']);
  //           // this.role.emit(true);
  //           this.roleName = 'admin';
  //           localStorage.setItem('role', this.roleName);
  //           this.email = loginData.email;
  //           localStorage.setItem('email', this.email);
  //         } else {
  //           this.status.emit(true);
  //         }
  //         this.capitalizedEmail = loginData.email.slice(0, 2).toUpperCase();
  //         localStorage.setItem('capitalizedEmail', this.capitalizedEmail);

  //         // console.log(this.capitalizedEmail);
  //         this.emailService.setEmailData(this.capitalizedEmail);
  //       } else {
  //         this.status.emit(true);
  //       }
  //     });
  // }

  Login(loginData: login) {
    this.http
      .post('http://localhost:8080/login', loginData)
      .subscribe((result: User | any) => {
        if (result != null) {
          console.log(result.role);
          this.roleName = result.role;
          this.status.emit(false);
          if (this.roleName === 'admin') {
            this.email = loginData.email;
            this.roleName = 'admin';
            this.userId = result.id;
            this.userName = result.username;
            localStorage.setItem('email', this.email);
            localStorage.setItem('role', this.roleName);
            localStorage.setItem('userId', this.userId);
            localStorage.setItem('username', this.userName);

            this.router.navigate(['dashboard']);
          } else if (this.roleName === 'user') {
            this.roleName = 'user';
            this.userId = result.id;
            this.email = loginData.email;
            this.userName = result.username;
            localStorage.setItem('email', this.email);
            localStorage.setItem('role', this.roleName);
            localStorage.setItem('userId', this.userId);
            localStorage.setItem('username', this.userName);

            this.router.navigate(['dashboard']);
          }

          this.capitalizedEmail = loginData.email.slice(0, 2).toUpperCase();
          localStorage.setItem('capitalizedEmail', this.capitalizedEmail);

          //         // console.log(this.capitalizedEmail);
          this.emailService.setEmailData(this.capitalizedEmail);
        } else {
          this.status.emit(true);
        }
      });
  }

  // Login(loginData: User) {
  //   this.http
  //     .post('http://localhost:8080/login', loginData, { responseType: 'text' })
  //     .subscribe((response: string) => {
  //       if (response === 'failed login') {
  //         this.status.emit(true);
  //       } else {
  //         this.status.emit(false);
  //         if (loginData.email.endsWith('@gmail.com')) {
  //           // this.role.emit(false);
  //           this.roleName = 'user';
  //           this.userId = response;
  //           localStorage.setItem('role', this.roleName);
  //           localStorage.setItem('userId', this.userId);

  //           this.http
  //             .get<User>(` http://localhost:8080/userInfo/${this.userId}`)
  //             .subscribe((response) => {
  //               this.email = response.email;
  //               localStorage.setItem('email', this.email);
  //               this.userName = response.username;
  //               localStorage.setItem('username', this.userName);
  //             });

  //           this.router.navigate(['dashboard']);
  //           // this.email = loginData.email;
  //           // localStorage.setItem('email', this.email);
  //         } else if (loginData.email.endsWith('@digital-edify.com')) {
  //           // this.role.emit(true);
  //           this.roleName = 'admin';
  //           this.userId = response;
  //           localStorage.setItem('role', this.roleName);
  //           localStorage.setItem('userId', this.userId);

  //           this.http
  //             .get<User>(` http://localhost:8080/userInfo/${this.userId}`)
  //             .subscribe((response) => {
  //               this.email = response.email;
  //               localStorage.setItem('email', this.email);
  //               this.userName = response.username;
  //               localStorage.setItem('username', this.userName);
  //             });
  //           this.router.navigate(['dashboard']);

  //           // this.email = loginData.email;
  //           // localStorage.setItem('email', this.email);
  //         } else {
  //           this.status.emit(true);
  //         }
  //         this.capitalizedEmail = loginData.email.slice(0, 2).toUpperCase();
  //         localStorage.setItem('capitalizedEmail', this.capitalizedEmail);

  //         // console.log(this.capitalizedEmail);
  //         this.emailService.setEmailData(this.capitalizedEmail);
  //       }
  //     });
  // }

  // SignUp(registerData: User) {
  //   console.log(registerData.username);
  //   console.log(registerData.email);

  //   this.http
  //     .post('http://localhost:8080/addUser', registerData, {
  //       responseType: 'text',
  //     })
  //     .subscribe((response: string) => {
  //       if (response === 'Added User') {
  //         this.add.emit(true);
  //       } else {
  //         this.add.emit(false);
  //       }
  //     });
  // }
}
