import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthLogin } from '../models/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _httpClient: HttpClient) { 
   
  }
  onLogin(data: AuthLogin): Observable<any>{
    return  this._httpClient.post('Users/Login',data)
    
      
  }

  onRegister(data: any): Observable<any> {
    return this._httpClient.post("Users/Register" ,data)
    
  }

}
