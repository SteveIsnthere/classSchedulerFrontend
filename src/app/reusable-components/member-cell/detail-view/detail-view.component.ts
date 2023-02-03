import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Member} from "../../../data/models/Member";
import {DataService} from "../../../data/data.service";

@Component({
  selector: 'app-detail-view',
  templateUrl: './detail-view.component.html',
  styleUrls: ['./detail-view.component.css']
})
export class DetailViewComponent {

    constructor(@Inject(MAT_DIALOG_DATA) public member: Member, private dataService: DataService) { }

}
