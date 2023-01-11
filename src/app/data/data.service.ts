import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Course} from "./models/Course";
import {Class} from "./models/Class";
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";
import {ClassPlan} from "./models/ClassPlan";
import {Member} from "./models/Member";
import {Relation} from "./models/Relation";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  url: string = "http://127.0.0.1:8000/";

  constructor(private http: HttpClient, private cookieService: CookieService, private router: Router) {
  }


  createClass(c: Class) {
    return this.http.post(this.url + "class/", c);
  }

  updateClass(oldClassId: string, newClass: Class) {
    return this.http.put(this.url + "class/" + oldClassId, newClass);
  }

  deleteClass(classId: string) {
    console.log("delete class " + classId);
    return this.http.delete(this.url + "class/" + classId);
  }

  getDaysInOneWeek(weekOffset: number) {
    return this.http.get<string[]>(this.url + "class/days_oneweek/" + weekOffset);
  }

  getClassInOneWeek(weekOffset: number) {
    return this.http.get<Class[]>(this.url + "class/oneweek/" + weekOffset);
  }

  getClassInOnWeekForOneMember(weekOffset: number, memberNickName: string) {
    return this.http.get<Class[]>(this.url + "class/memberoneweek/" + weekOffset + "/" + memberNickName);
  }

  createCourse(c: Course) {
    return this.http.post(this.url + "course/", c);
  }

  getTeachersOfCourse(courseName: string) {
    return this.http.get<string[]>(this.url + "course/teachers/" + courseName);
  }

  getStudentsOfCourse(courseName: string) {
    return this.http.get<string[]>(this.url + "course/students/" + courseName);
  }

  getAllCourses() {
    return this.http.get<Course[]>(this.url + "course/all");
  }

  getCourse(courseName: string) {
    return this.http.get<Course>(this.url + "course/" + courseName);
  }

  createPlan(p:ClassPlan){
    return this.http.post(this.url + "plan/", p);
  }

  updatePlan(oldPlanId: string, newPlan: ClassPlan) {
    return this.http.put(this.url + "plan/" + oldPlanId, newPlan);
  }

  deletePlan(planId: string) {
    return this.http.delete(this.url + "plan/" + planId);
  }

  getPlansOfMember(memberNickName: string) {
    return this.http.get<ClassPlan[]>(this.url + "plan/member/" + memberNickName);
  }

  createMember(m: Member) {
    return this.http.post(this.url + "member/", m);
  }

  getMember(memberNickName: string) {
    return this.http.get<Member>(this.url + "member/" + memberNickName);
  }

  deleteMember(memberNickName: string) {
    return this.http.delete(this.url + "member/" + memberNickName);
  }

  getAllMembers() {
    return this.http.get<Member[]>(this.url + "member/all");
  }

  createRelation(r: Relation) {
    return this.http.post(this.url + "relation/", r);
  }

  updateRelation(oldRelationId: string, newRelation: Relation) {
    return this.http.put(this.url + "relation/" + oldRelationId, newRelation);
  }

  deleteRelation(relationId: string) {
    return this.http.delete(this.url + "relation/" + relationId);
  }

  getRelationsOfMember(memberNickName: string) {
    return this.http.get<Relation[]>(this.url + "relation/member/" + memberNickName);
  }

  getAllRelations() {
    return this.http.get<Relation[]>(this.url + "relation/all");
  }
}
