import {Component, Input} from '@angular/core';
import {DisplayElement, getBlankDisplayElement} from "../class-planner/DisplayElement";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {ClassBottomSheetComponent} from "./class-bottom-sheet/class-bottom-sheet.component";

@Component({
  selector: 'app-class-cell',
  templateUrl: './class-cell.component.html',
  styleUrls: ['./class-cell.component.css']
})
export class ClassCellComponent {
  @Input() data: DisplayElement = getBlankDisplayElement();
  @Input() isTeacher: boolean = true;

  constructor(private bottomSheet: MatBottomSheet) {
  }
  showBottomSheet() {
    this.bottomSheet.open(ClassBottomSheetComponent, {
      data: this.data
    });
  }
}
