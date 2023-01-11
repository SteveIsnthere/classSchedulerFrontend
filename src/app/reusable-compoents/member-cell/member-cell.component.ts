import {Component, Input} from '@angular/core';
import {Member} from "../../data/models/Member";
import {dummyTeacher} from "../../data/models/dummyData";

@Component({
  selector: 'app-member-cell',
  templateUrl: './member-cell.component.html',
  styleUrls: ['./member-cell.component.css']
})
export class MemberCellComponent {
  @Input() member: Member = dummyTeacher;
}
