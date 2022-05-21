import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { user } from '../../Users/Models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {}

  users$(): Observable<user[]> {
    return this.httpClient.get<user[]>('/assets/data/users.json');
  }
}
