import {Component, Input, OnInit} from '@angular/core';
import {dummyRelation, Relation} from "../../data/models/Relation";
import {RelationDetailDialogComponent} from "./relation-detail-dialog/relation-detail-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {Member} from "../../data/models/Member";
import {DataService} from "../../data/data.service";

@Component({
  selector: 'app-relation-cell',
  templateUrl: './relation-cell.component.html',
  styleUrls: ['./relation-cell.component.css']
})
export class RelationCellComponent implements OnInit {
  @Input() relation: Relation = dummyRelation();
  @Input() isTeacher: boolean = true;
  relatedMember: null | Member = null;

  notShowDetail: boolean = false;

  constructor(private dialog: MatDialog, private dataService: DataService) {
  }


  showBottomSheet() {
    if (this.notShowDetail) {
      return;
    }
    this.dialog.open(RelationDetailDialogComponent, {
      data: this.relation
    });
  }

  preventShowDetail() {
    this.notShowDetail = true;
    // set a timer to reset the flag
    setTimeout(() => {
      this.notShowDetail = false;
    }, 30);
  }

  ngOnInit(): void {
    let relatedMemberNickName = ''
    if (this.isTeacher) {
      relatedMemberNickName = this.relation.student;
    } else {
      relatedMemberNickName = this.relation.teacher;
    }
    console.log("relatedMember: " + relatedMemberNickName)
    this.dataService.getMember(relatedMemberNickName).subscribe(
      (member) => {
        this.relatedMember = member;
        console.log("relatedMember: " + this.relatedMember)
      }
    )
  }
}
