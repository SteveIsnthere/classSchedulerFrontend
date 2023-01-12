import {Component, Input} from '@angular/core';
import {dummyRelation, Relation} from "../../data/models/Relation";
import {RelationBottomSheetComponent} from "./relation-bottom-sheet/relation-bottom-sheet.component";
import {MatBottomSheet,MatBottomSheetRef} from "@angular/material/bottom-sheet";

@Component({
  selector: 'app-relation-cell',
  templateUrl: './relation-cell.component.html',
  styleUrls: ['./relation-cell.component.css']
})
export class RelationCellComponent {
  @Input() relation: Relation = dummyRelation();
  @Input() isTeacher: boolean = true;

  constructor(private bottomSheet: MatBottomSheet) {
  }

  showBottomSheet() {
    this.bottomSheet.open(RelationBottomSheetComponent, {
      data: this.relation
    });
  }
}
