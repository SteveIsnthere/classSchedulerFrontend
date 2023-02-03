import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {DataService} from "../../../data/data.service";
import {Member} from "../../../data/models/Member";

@Component({
  selector: 'app-schedule-view',
  templateUrl: './schedule-view.component.html',
  styleUrls: ['./schedule-view.component.css']
})
export class ScheduleViewComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public member: Member, private dataService: DataService) {

  }

}
