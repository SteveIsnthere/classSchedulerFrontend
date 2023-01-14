import {Component, Input} from '@angular/core';
import {dummyRelation, Relation} from "../../data/models/Relation";
import {RelationDetailDialogComponent} from "./relation-detail-dialog/relation-detail-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-relation-cell',
  templateUrl: './relation-cell.component.html',
  styleUrls: ['./relation-cell.component.css']
})
export class RelationCellComponent {
  @Input() relation: Relation = dummyRelation();
  @Input() isTeacher: boolean = true;

  constructor(private dialog: MatDialog) {
  }

  showBottomSheet() {
    this.dialog.open(RelationDetailDialogComponent, {
      data: this.relation
    });
  }
}
