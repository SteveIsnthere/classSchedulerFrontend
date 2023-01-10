import {Component, Input} from '@angular/core';
import {dummyRelation, Relation} from "../../data/models/Relation";

@Component({
  selector: 'app-relation-cell',
  templateUrl: './relation-cell.component.html',
  styleUrls: ['./relation-cell.component.css']
})
export class RelationCellComponent {
  @Input() relation: Relation = dummyRelation();
  @Input() isTeacher: boolean = true;
}
