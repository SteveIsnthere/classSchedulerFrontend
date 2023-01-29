import {Component} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {DataService} from "../../data/data.service";
import {AddMemberComponent} from "./add-member/add-member.component";

@Component({
  selector: 'app-admin-management',
  templateUrl: './admin-management.component.html',
  styleUrls: ['./admin-management.component.css']
})
export class AdminManagementComponent {

  constructor(private dialog: MatDialog, private dataService: DataService) {

  }

  openAddMemberDialog() {
    this.dialog.open(AddMemberComponent);
  }
}
