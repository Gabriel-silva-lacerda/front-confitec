import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/Users';
import { Response } from '../models/Response';

const URL = environment.URL;

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  constructor(private http: HttpClient) {}
  usersData = new BehaviorSubject<User[]>([]);
  userEdit = new BehaviorSubject<User>({} as User);

  getAllUsers(): Observable<Response<User[]>> {
    return this.http.get<Response<User[]>>(`${URL}api/Users`);
  }

  createUser(user: User): Observable<Response<User[]>> {
    return this.http.post<Response<User[]>>(`${URL}api/Users`, user);
  }

  editUser(user: User): Observable<Response<User[]>> {
    return this.http.put<Response<User[]>>(`${URL}api/Users`, user);
  }

  deleteUser(id: number): Observable<Response<User>> {
    return this.http.delete<Response<User>>(`${URL}api/Users?id=${id}`);
  }
}
