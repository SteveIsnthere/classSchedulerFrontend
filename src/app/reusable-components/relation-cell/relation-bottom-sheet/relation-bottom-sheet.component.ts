import {Component, Inject} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA} from "@angular/material/bottom-sheet";
import {dummyRelation, Relation} from "../../../data/models/Relation";

@Component({
  selector: 'app-relation-bottom-sheet',
  templateUrl: './relation-bottom-sheet.component.html',
  styleUrls: ['./relation-bottom-sheet.component.css']
})
export class RelationBottomSheetComponent {
  relation: Relation;
  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: Relation) {
    this.relation = data
    console.log(this.relation)
  }
}
