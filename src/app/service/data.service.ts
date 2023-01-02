import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Course} from "../models/Course";
import {Class} from "../models/Class";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  url: string = "http://127.0.0.1:8000/";

  constructor(private http: HttpClient) {
  }

  getDaysInOneWeek(weekOffset: number) {
    return this.http.get<string[]>(this.url + "class/days_oneweek/" + weekOffset);
  }

  getClassInOneWeek(weekOffset: number) {
    return this.http.get<Class[]>(this.url + "class/oneweek/" + weekOffset);
  }

  getAllCourses() {
    return this.http.get<Course[]>(this.url + "course/all");
  }
}
