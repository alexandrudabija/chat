import { Component,OnInit } from '@angular/core';
import { UserService } from './services/user/user.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'chat';
  constructor(private userService: UserService) { }
  chatId!: string;
  usersId!: string[]
  show: boolean = false
  userName!: string
  ngOnInit(): void
  {

  // this.userService.allUsers$.subscribe(data => console.log(data))


    if (JSON.parse(localStorage.getItem('userId')!) )
    {

      this.show = true;
      this.userService.getUser$(JSON.parse(localStorage.getItem('userId')!)).subscribe((data) => {this.userName =data.name});


    }
    else {this.show =false}

  }



  receiveUsersId(usersId: string[]):void
  {

    this.usersId = usersId

  }

  sendChatId(chatId:string) {

    this.chatId=chatId
  }
  hideFormUser(obj:  string ): void
  {
    this.show = true;
    this.userName = obj
  }

  changeUser():void
  {
    this.show = false;
    localStorage.removeItem("userId");

  }


}
