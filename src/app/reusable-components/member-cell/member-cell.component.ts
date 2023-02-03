import {Component, Input} from '@angular/core';
import {Member} from "../../data/models/Member";
import {dummyTeacher} from "../../data/models/dummyData";
import {MessageViewComponent} from "./message-view/message-view.component";
import {DetailViewComponent} from "./detail-view/detail-view.component";
import {ScheduleViewComponent} from "./schedule-view/schedule-view.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-member-cell',
  templateUrl: './member-cell.component.html',
  styleUrls: ['./member-cell.component.css']
})
export class MemberCellComponent {
  @Input() member: Member = dummyTeacher;

  constructor(private dialog: MatDialog) {

  }

  showMessageView() {
    this.dialog.open(MessageViewComponent, {
      data: this.member.nickname
    });
  }

  showDetailsView() {
    this.dialog.open(DetailViewComponent, {
      data: this.member
    });
  }

  showScheduleView() {
    this.dialog.open(ScheduleViewComponent, {
      data: this.member
    });
  }
}
