import {Component, Inject} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA} from "@angular/material/bottom-sheet";
import {Class} from "../../../data/models/Class";
import {DisplayElement} from "../../class-planner/DisplayElement";
import {PlanningServiceService} from "../../class-planner/planning-service.service";

@Component({
  selector: 'app-class-bottom-sheet',
  templateUrl: './class-bottom-sheet.component.html',
  styleUrls: ['./class-bottom-sheet.component.css']
})
export class ClassBottomSheetComponent {
  _class: Class | undefined;

  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: DisplayElement, private planningService: PlanningServiceService) {
    this._class = this.planningService.classes.find(c => c._id === data._id);
  }
}
