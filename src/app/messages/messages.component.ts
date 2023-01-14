import {Component} from '@angular/core';
import {MessageService} from "./message.service";
import {Message} from "../data/models/Message";
import {AuthService} from "../data/auth.service";
import {DataService} from "../data/data.service";

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent {
  constructor(public messageService: MessageService, public authService: AuthService, public dataService: DataService) {
  }

  getTimeSincePosted(timePosted: string) {
    let timePostedDate = new Date(timePosted);
    let timeNow = new Date();
    let timeDifference = timeNow.getTime() - timePostedDate.getTime();
    let timeDifferenceInMinutes = Math.floor(timeDifference / (1000 * 60));
    let timeDifferenceInHours = Math.floor(timeDifferenceInMinutes / 60);
    let timeDifferenceInDays = Math.floor(timeDifferenceInHours / 24);
    if (timeDifferenceInDays > 0) {
      return `${timeDifferenceInDays} days ago`;
    } else if (timeDifferenceInHours > 0) {
      return `${timeDifferenceInHours} hours ago`;
    } else {
      return `${timeDifferenceInMinutes} minutes ago`;
    }
  }

  clearMessages() {
    this.messageService.clearMessages();
  }

  deleteMessage(messageId: string) {
    this.messageService.deleteMessage(messageId);
  }

  replyToMessage(oldMessage: Message, inputElement: HTMLTextAreaElement) {
    let content: string = inputElement.value;
    if (content === "") {
      return;
    }
    let newMessage: Message = {
      _id: "",
      senderNickName: this.authService.self?.nickname!,
      receiverNickName: oldMessage.senderNickName,
      time: "",
      content: content
    }
    console.log(newMessage);
    this.messageService.sendMessage(newMessage);
    this.deleteMessage(oldMessage._id);
  }
}
