import {Component} from '@angular/core';
import {AuthService} from "../../data/auth.service";
import {MessageService} from "../../messages/message.service";
import {MatDialog} from '@angular/material/dialog';
import {MessagesComponent} from "../../messages/messages.component";

@Component({
  selector: 'app-self-actions',
  templateUrl: './self-actions.component.html',
  styleUrls: ['./self-actions.component.css']
})
export class SelfActionsComponent {
  constructor(public authService: AuthService, public messageService: MessageService, public dialog: MatDialog) {
  }

  openDialog() {
    const dialogRef = this.dialog.open(MessagesComponent);
  }

  shouldHideBadge() {
    return this.messageService.numberOfMessages() == 0;
  }
}
