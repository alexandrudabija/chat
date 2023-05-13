import { Component, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  constructor(private userService: UserService, private formBuilder: FormBuilder) {}
  @Output() userInChat = new EventEmitter< string >
  userForm!: FormGroup;


  ngOnInit() {
    this.userForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  get name() {

    return this.userForm.get('name')

  }

  createUser(name: string )
  {



    this.userInChat.emit(name )



    this.userService.postUser({
      name: name!,
      photo:""

    }).subscribe(
      response => {
        // Handle successful response
        localStorage.setItem("userId", JSON.stringify(response.idUser))

      },
      error => {
        // Handle error
        console.error('Error adding user:', error);
      }
    );



  }

}
