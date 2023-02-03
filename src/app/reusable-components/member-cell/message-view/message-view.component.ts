import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {DataService} from "../../../data/data.service";

@Component({
  selector: 'app-message-view',
  templateUrl: './message-view.component.html',
  styleUrls: ['./message-view.component.css']
})
export class MessageViewComponent {

    constructor(@Inject(MAT_DIALOG_DATA) public receiverNickName: string, private dataService: DataService) {

    }

}
