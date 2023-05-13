import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/app/environments/environments';
import { BehaviorSubject, Observable } from 'rxjs';
import { Firestore, collectionData, collection, updateDoc, deleteDoc, doc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ChatroomService {

  constructor(private http: HttpClient, private firestore: Firestore) { }

 messagesArray = new BehaviorSubject<any>({ messages: []});

// we send the ids for create a chatRoom
  postChatRoom(users: Array<string>): Observable<Array<string>>
  {
    const data = { users: users };


    return this.http.post<Array<string>>(environment.apiPostChat, data) as Observable<Array<string>>;


  }

  postMessage(message: { chatId: string, senderId: string, recipientId: string, message: string | null }): Observable<{ chatId: string, senderId: string, recipientId: string, message: string | null }>
{
    return this.http.post<{ chatId: string, senderId: string, recipientId: string, message: string | null }>(environment.apiPostMessage, message) as Observable<{ chatId: string, senderId: string, recipientId: string, message: string }>

}

  // getMessages(chatId:string):Observable<any>

  // {
  //   const url = `${environment.apiGetMessage}${chatId}` ;

  //   return this.http.get<any>(url) as Observable<any>

  // }

  getMessages(chatId: string): Observable<any> {
    const messagesRef = collection(this.firestore, `chats/${chatId}/messages`);
    const query = collectionData(messagesRef, { idField: 'id' });

    return query as Observable<any>;
  }


  removeMessage(chatId: string, messageId: string): Promise<void> {
    const messageRef = doc(this.firestore, `chats/${chatId}/messages/${messageId}`);
    return deleteDoc(messageRef);
  }

  // updateMessage(chatId: string, messageId: string, updatedMessage: any): Promise<void> {
  //   const messageRef = doc(this.firestore, `chats/${chatId}/messages/${messageId}`);
  //   return updateDoc(messageRef, updatedMessage);


  // }

  updateMessage(chatId: string, messageId: string, updatedMessage: string): Promise<void> {
    const messageRef = doc(this.firestore, `chats/${chatId}/messages/${messageId}`);
    const updatedData = { message: updatedMessage };
    return updateDoc(messageRef, updatedData);
  }
  
}
