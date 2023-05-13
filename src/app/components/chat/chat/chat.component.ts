import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, map } from 'rxjs';
import { ChatroomService } from 'src/app/services/chatroom/chatroom.service';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  @Input() chatId!: string;
  @Input() usersId!: string[];
  messageForm = new FormControl('')
  userId!: string;
  messages$!: Observable<any>;
  sortedMessages: []=[];
  messages: Array<{
    chatId: string;
    id: string;
    senderId: string;
    recipientId: string;
    message: string | null;
  }> = [];

  newMessage!:string |''
  edit: boolean = false;
  thisIdEdit?: string;
  constructor(private chatroomService: ChatroomService) { }

  ngOnInit(): void {
    this.userId = JSON.parse(localStorage.getItem('userId')!)
    this.messages$ = this.chatroomService.messagesArray.asObservable().pipe(
      map((data: any) => {
        // Transform the emitted data/messages here if needed

        return data.messages;
      })
    );



    this.chatroomService.getMessages( this.chatId  ? this.chatId : JSON.parse(localStorage.getItem('chatId')!)).subscribe((messages: any) => {
     

      this.chatroomService.messagesArray.next({ messages: messages })
    });
  }




  sendMessage():void
  {

    const senderId = this.usersId && this.usersId.length > 0
      ? this.usersId[0]
      : JSON.parse(localStorage.getItem('usersId')!)[0];

    const recipientId = this.usersId && this.usersId.length > 1
      ? this.usersId[1]
      : JSON.parse(localStorage.getItem('usersId')!)[1];

    this.chatroomService.postMessage({
      chatId: this.chatId ? this.chatId : JSON.parse(localStorage.getItem('chatId')!),
      senderId: senderId,
      recipientId: recipientId,
      message: this.messageForm.value
    }).subscribe(

      (response: any) => {

        this.ngOnInit();
        this.messageForm.reset();
      },
      error => {
        // Handle error
        console.error('Error adding user:', error);
      }


)




  }

  removeMessage(messageId: string):void {
    this.chatroomService.removeMessage(this.chatId ? this.chatId : JSON.parse(localStorage.getItem('chatId')!), messageId)
      .then(() => {
        console.log('Message removed successfully.');
      })
      .catch((error) => {
        console.error('Error removing message:', error);
      });
  }

  updateMessage(messageId: string, updatedMessage: string):void {
    console.log(messageId, updatedMessage);

    this.edit = !this.edit
    this.thisIdEdit = messageId
    if (updatedMessage !== undefined && updatedMessage.length > 0) {
      const chatId = this.chatId || JSON.parse(localStorage.getItem('chatId')!);
      // console.log(chatId);

      this.chatroomService.updateMessage(chatId, messageId, updatedMessage)
        .then(() => console.log('Message updated successfully.'))
        .catch((error) => console.error('Error updating message:', error));
    }
  }


}
