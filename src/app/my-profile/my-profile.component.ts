import { Component, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';
import { User } from '../user';
import { HttpClient } from '@angular/common/http';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css'],
})
export class MyProfileComponent {
  username: string | any = localStorage.getItem('username');
  email: string | any = localStorage.getItem('email');
  tick = faCheckCircle;
  delete = faTrash;
  userId: string | any = localStorage.getItem('userId');
  emailData: string | any;
  myProfile: boolean | any;

  private baseURL = 'http://localhost:8080';
  // username: string = '';

  constructor(
    private auth: AuthService,
    private userservice: UserService,
    private http: HttpClient
  ) {
    this.emailData = localStorage.getItem('capitalizedEmail');
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

    this.http
      .get<User>(` http://localhost:8080/userInfo/${this.userId}`)
      .subscribe((response) => {
        this.email = response.email;
        localStorage.setItem('email', this.email);
        this.username = response.username;
        localStorage.setItem('username', this.username);
      });
  }

  editProfile(data: User) {
    // console.log(data);
    this.http
      .put(` ${this.baseURL}/editProfile/${this.userId}`, data, {
        responseType: 'text',
      })
      .subscribe((response: string) => {
        console.log(response);

        if (response === 'updated successfully') {
          // console.log(response);

          alert('updated successfully');
        } else {
          console.log(response);
          alert('error');
        }
      });
  }

  @ViewChild('fileInput') fileInput!: ElementRef;

  onSelectFile(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];

      this.updateProfile(file);
    }
  }

  updateProfile(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    // Assuming this.userId is your user ID
    this.http
      .put(
        `http://localhost:8080/updateProfilePicture/${this.userId}`,
        formData
      )
      .subscribe(
        (response) => {
          console.log(response);
          // Handle success, e.g., show a success message
        },
        (error) => {
          console.error('Error updating profile picture:', error);
          // Handle error, e.g., show an error message
        }
      );
  }

  deletePic() {
    this.http
      .delete(`http://localhost:8080/deletePicture/${this.userId}`)
      .subscribe();
  }
}
