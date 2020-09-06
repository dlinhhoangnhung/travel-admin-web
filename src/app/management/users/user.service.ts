import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from './user.model';

@Injectable()
export class UserSerivce {
  private _url: string = "https://tour-api-service.herokuapp.com/api/profile";
  constructor(private http: HttpClient) {}
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this._url);
  }
  getUserbyId(id): Observable<User> {
    return this.http.get<User>(
      "https://tour-api-service.herokuapp.com/api/profile/" + id
    );
  }
}
