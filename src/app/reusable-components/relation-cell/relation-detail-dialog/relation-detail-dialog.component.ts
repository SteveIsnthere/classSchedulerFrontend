import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Relation} from "../../../data/models/Relation";
import {Member} from "../../../data/models/Member";
import {DataService} from "../../../data/data.service";
import {dummyStudent, dummyTeacher} from "../../../data/models/dummyData";

@Component({
  selector: 'app-relation-bottom-sheet',
  templateUrl: './relation-detail-dialog.component.html',
  styleUrls: ['./relation-detail-dialog.component.css']
})
export class RelationDetailDialogComponent {
  relation: Relation;
  teacher: Member = dummyTeacher;

  student: Member = dummyStudent;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Relation, private dataService: DataService) {
    this.relation = data
    dataService.getMember(this.relation.teacher).subscribe(
      (teacher: Member) => {
        this.teacher = teacher;
      }
    );
    dataService.getMember(this.relation.student).subscribe(
      (student: Member) => {
        this.student = student;
      }
    );
  }
}
