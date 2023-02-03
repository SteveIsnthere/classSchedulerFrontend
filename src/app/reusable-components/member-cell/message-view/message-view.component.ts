import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {DataService} from "../../../data/data.service";
import {AuthService} from "../../../data/auth.service";

@Component({
  selector: 'app-message-view',
  templateUrl: './message-view.component.html',
  styleUrls: ['./message-view.component.css']
})
export class MessageViewComponent {
  message: string = '';

  constructor(@Inject(MAT_DIALOG_DATA) public receiverNickName: string, private dataService: DataService, private authService: AuthService) {
  }

  send() {
    if (this.message.trim() === '') {
      return;
    }
    let newMessage = {
      _id: '',
      senderNickName: this.authService.self!.nickname,
      receiverNickName: this.receiverNickName,
      time: new Date().toISOString(),
      content: this.message
    }

    this.dataService.postMessage(newMessage);
  }
}
