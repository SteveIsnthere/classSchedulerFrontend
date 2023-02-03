import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Relation} from "../../../data/models/Relation";
import {Member} from "../../../data/models/Member";
import {DataService} from "../../../data/data.service";
import {dummyStudent, dummyTeacher} from "../../../data/models/dummyData";
import {FormBuilder, Validators} from "@angular/forms";
import {PlanningServiceService} from "../../class-planner/planning-service.service";

@Component({
  selector: 'app-relation-bottom-sheet',
  templateUrl: './relation-detail-dialog.component.html',
  styleUrls: ['./relation-detail-dialog.component.css']
})
export class RelationDetailDialogComponent implements OnInit {
  relation: Relation;
  editMode = false;
  formGroup = this._formBuilder.group({
    nameCtrl: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    classPerWeekCtrl: ['', [Validators.required, Validators.min(0), Validators.max(8)]],
    durationCtrl: ['', [Validators.required, Validators.min(0.5), Validators.max(8)]],
    priceCtrl: ['', [Validators.required, Validators.min(10), Validators.max(2000)]],
    salaryCtrl: ['', [Validators.required, Validators.min(10), Validators.max(2000)]],
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: Relation, private _formBuilder: FormBuilder, private dataService: DataService, private planningService: PlanningServiceService) {
    this.relation = this.data
  }

  ngOnInit(): void {
  }

  updatePlanningService() {
    // this.planningService.readyToDisplay = false;
    this.planningService.initDisplayData();
  }

  updateRelation() {
    this.dataService.updateRelation(this.relation._id, this.relation).subscribe(
      () => {
        this.updatePlanningService()
      },
      () => {
        alert("failed to update relation")
      }
    );
  }

  deleteRelation() {
    this.dataService.deleteRelation(this.relation._id).subscribe(
      () => {
        this.updatePlanningService()
      },
      () => {
        alert("failed to delete relation")
      }
    );
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
  }
}
