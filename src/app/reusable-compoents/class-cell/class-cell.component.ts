import {Component, Input} from '@angular/core';
import {DisplayElement, getBlankDisplayElement} from "../class-planner/DisplayElement";

@Component({
  selector: 'app-class-cell',
  templateUrl: './class-cell.component.html',
  styleUrls: ['./class-cell.component.css']
})
export class ClassCellComponent {
  @Input() data: DisplayElement = getBlankDisplayElement();
  @Input() isTeacher: boolean = true;
}
