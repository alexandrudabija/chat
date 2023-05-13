import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/app/environments/environments';
import { Observable } from 'rxjs';
import { Firestore, collection } from 'firebase/firestore';
import { collectionData } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {
// , private firestore: Firestore
  constructor(private http: HttpClient) { }

 get allUsers$():Observable<any>
 {

   return this.http.get(environment.apiGetAllUser) as Observable<any>


 }

  //  allUsers$(): Observable<any> {
  //   const usersRef = collection(this.firestore, 'users');
  //   return collectionData(usersRef) as Observable<any>;
  // }

  getUser$(userId: string): Observable<any> {
    const url = `${environment.apiGetUser}${userId}`;
    return this.http.get(url) as Observable<any>;
  }
  postUser(user: { name:string,photo:string }): Observable<any> {
    return this.http.post<{ name: string, photo: string }>(environment.apiPostUser, user);
  }






}
