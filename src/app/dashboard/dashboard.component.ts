import {Component} from '@angular/core';
import {DataService} from "../data/data.service";
import {Router} from "@angular/router";
import {Member} from "../data/models/Member";
import {dummyTeacher} from "../data/models/dummyData";
import {PlanningServiceService} from "../class-planner/planning-service.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  members: Member[] = [];
  selectedMember: Member = dummyTeacher;

  constructor(public dataService: DataService, private router: Router, public planningService: PlanningServiceService) {
    this.dataService.getAllMembers().subscribe((data: Member[]) => {
      this.members = data;
    })
  }

  selectMember(member: Member) {
    this.selectedMember = member;
    this.planningService.init(member);
  }

  memberSelected() {
    return this.selectedMember !== dummyTeacher;
  }
}
