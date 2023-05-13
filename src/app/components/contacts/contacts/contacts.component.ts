import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';
import { ChatroomService } from 'src/app/services/chatroom/chatroom.service';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  constructor(private userService: UserService, private chatroomService: ChatroomService)
  { }

  users$ =new Observable<any>
  chatId!: string;
  @Output() usersID: EventEmitter<string[]> = new EventEmitter<string[]>();
  @Output() sendChatId = new EventEmitter<string>
   selectedUser! :string // Variable to store the selected user
  searchControl = new FormControl('')




  ngOnInit(): void {
    this.chatroomService.getMessages(this.chatId).subscribe((messages: any) => {
     this.chatroomService.messagesArray.next({ messages: messages }) });
    // this.users$ = this.userService.allUsers$.pipe(
    //   map(users => users.filter((user:{id:string,name:string}) => user.id !== JSON.parse(localStorage.getItem('userId')!)))
    // );
    this.users$ = this.userService.allUsers$.pipe(
      map(users => users.filter((user: { id: string }) => user.id !== JSON.parse(localStorage.getItem('userId')!)))
    );

    this.selectedUser = JSON.parse(localStorage.getItem('userName')!) || 'select user to chat !';




  }

  handleClick()
  {
    this.users$ = this.userService.allUsers$.pipe(
      map(users => users.filter((user: { id: string }) => user.id !== JSON.parse(localStorage.getItem('userId')!)))
    );

  }


  createChat(user: { id: string, name: string, photo: string }):void
  {
    localStorage.setItem("recipientId", JSON.stringify(user.id))
    localStorage.setItem("userName", JSON.stringify(user.name))
     this.selectedUser=user.name
    this.chatroomService.postChatRoom([JSON.parse(localStorage.getItem('userId')!), user.id]).subscribe(

      (response:any) => {
        // Handle successful response
        this.usersID.emit([JSON.parse(localStorage.getItem('userId')!), user.id]);
        localStorage.setItem("usersId", JSON.stringify([JSON.parse(localStorage.getItem('userId')!), user.id]))
        this.sendChatId.emit(response.chatId)
        this.chatId = response.chatId
        localStorage.setItem("chatId", JSON.stringify(response.chatId))


this.ngOnInit()
      },
      error => {
        // Handle error
        console.error('Error adding user:', error);
      }

)

  }

}
