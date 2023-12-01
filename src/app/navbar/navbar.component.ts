import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { faSignOut } from '@fortawesome/free-solid-svg-icons';
import { EmailService } from '../email.service';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  falink = faArrowUpRightFromSquare;
  fauser = faCircleUser;
  fasignout = faSignOut;
  emailData: string | any;
  role: string | any;
  userId: string | any = localStorage.getItem('userId');
  myProfile: boolean | any;

  private baseURL = 'http://localhost:8080';

  constructor(
    public router: Router,
    private emailService: EmailService,
    private auth: AuthService,
    private http: HttpClient
  ) {
    // this.emailData = emailService.getEmailData();
    this.emailData = localStorage.getItem('capitalizedEmail');
    // this.role = this.auth.roleName;
    this.role = localStorage.getItem('role');
    // this.auth.role.subscribe((result) => {
    //   console.log(result);
    //   if (result === true) {
    //     this.role = 'admin';
    //   } else if (result === false) {
    //     this.role = 'user';
    //   } else {
    //     this.role = '';
    //   }
    //   console.log(this.role);
    // });
  }

  ngOnInit(): void {
    this.http
      .get(`${this.baseURL}/displayProfilePicture/${this.userId}`, {
        responseType: 'text',
      })
      .subscribe(
        (data) => {
          if (data == null) {
            this.myProfile = false;
            this.emailData = localStorage.getItem('capitalizedEmail');
            // console.log(this.emailData);
          } else {
            this.myProfile = true;
            this.emailData = data;
            // console.log(this.emailData);
          }
        },
        (error) => {
          console.error('Error loading profile picture:', error);
        }
      );
  }

  admin() {
    this.router.navigate(['admin']);
  }

  dashboard() {
    this.router.navigate(['dashboard']);
  }

  profile() {
    this.router.navigate(['my-profile']);
  }

  signOut() {
    this.router.navigate(['login']);
    localStorage.clear();
  }
}
