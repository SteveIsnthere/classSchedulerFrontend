import {Component, OnInit} from '@angular/core';
import {Course} from "./models/Course";
import {DataService} from "./service/data.service";
import {Class} from "./models/Class";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'classSchedulerFrontend';
  courses: Course[] = []
  classes: Class[] = []

  daysOfWeek: string[] = []

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    this.getAllCourses();
    this.getDaysInOneWeek(0);
    this.getClassInOneWeek(0);
  }


  getDaysInOneWeek(weekOffset: number) {
    this.dataService.getDaysInOneWeek(weekOffset)
      .subscribe((data: string[]) => {
      this.daysOfWeek = data;
    })
  }

  getClassInOneWeek(weekOffset: number) {
    this.dataService.getClassInOneWeek(weekOffset).subscribe((data: Class[]) => {
      this.classes = data;
    })
  }

  toDateString(date: string) {
    return new Date(date).getHours();
  }
  getAllCourses() {
    this.dataService.getAllCourses().subscribe((data: Course[]) => {
      this.courses = data;
    })
  }
}
