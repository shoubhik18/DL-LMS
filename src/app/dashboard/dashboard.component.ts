import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faVideo } from '@fortawesome/free-solid-svg-icons';
import { course } from '../user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  right = faArrowRight;
  camera = faVideo;
  course: course[] | any;

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get<course[]>(' http://localhost:8080/getCourses/2')
      .subscribe((data) => {
        this.course = data;
        console.log(this.course);
      });
  }

  continue() {
    this.router.navigate(['learners']);
  }
}
