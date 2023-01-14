import {Injectable} from '@angular/core';
import {Message} from "../data/models/Message";
import {DataService} from "../data/data.service";
import {AuthService} from "../data/auth.service";

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: Message[] = [];

  constructor(private dataService: DataService, authService: AuthService) {
    this.dataService.getMessages(authService.self?.nickname!).subscribe(
      (messages: Message[]) => {
        this.messages = messages;
      }
    )
  }

  deleteMessage(messageId: string) {
    this.dataService.deleteMessage(messageId).subscribe(
      () => {
        this.messages = this.messages.filter(message => message._id !== messageId);
      }
    )
  }

  numberOfMessages() {
    return this.messages.length;
  }

  sendMessage(newMessage: Message) {
    this.dataService.postMessage(newMessage).subscribe()
  }

  clearMessages() {
    for (let message of this.messages) {
      this.deleteMessage(message._id);
    }
  }
}
