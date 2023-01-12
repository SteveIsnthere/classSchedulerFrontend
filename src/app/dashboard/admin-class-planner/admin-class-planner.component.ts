import {Component} from '@angular/core';
import {Member} from "../../data/models/Member";
import {PlanningServiceService} from "../../reusable-components/class-planner/planning-service.service";

@Component({
  selector: 'app-admin-class-planner',
  templateUrl: './admin-class-planner.component.html',
  styleUrls: ['./admin-class-planner.component.css']
})
export class AdminClassPlannerComponent {
  selectedMember: Member | null = null;

  constructor(public planningService: PlanningServiceService) {
  }

  selectMember(member: Member) {
    this.selectedMember = member;
    this.planningService.readyToDisplay = false;
    this.planningService.init(member);
  }

  memberSelected() {
    return this.selectedMember !== null;
  }
}
