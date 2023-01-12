import {Component} from '@angular/core';
import {DataService} from "../data/data.service";
import {Router} from "@angular/router";
import {Member} from "../data/models/Member";
import {dummyTeacher} from "../data/models/dummyData";
import {PlanningServiceService} from "../reusable-components/class-planner/planning-service.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  constructor(public dataService: DataService, private router: Router, public planningService: PlanningServiceService) {

  }

}
