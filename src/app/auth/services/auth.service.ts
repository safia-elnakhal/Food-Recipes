import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthLogin } from '../models/auth';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
 // token= localStorage.getItem('userToken')
  role: string |any ='';
  constructor(private _httpClient: HttpClient,
              private _Router:Router
  ) { 
    if (localStorage.getItem('userToken')!==null) {
      console.log(this.getProfile());
    }
   
    
  }

  getProfile() {
    let encoded: any =localStorage.getItem('userToken');
    let decoded: any = jwtDecode(encoded);
    localStorage.setItem('userRole', decoded.userGroup);
    localStorage.setItem('userName', decoded.userName);
    console.log(decoded);
    this.getRole();
    
  }
  getRole() {
    if (localStorage.getItem('userToken')!== null && localStorage.getItem('userRole')!== null) {
      this.role = localStorage.getItem('userRole');
    }
  }
  onLogin(data: AuthLogin): Observable<any>{
    return  this._httpClient.post('Users/Login',data)
    
      
  }

  onRegister(data: any): Observable<any> {
    return this._httpClient.post("Users/Register" ,data)
    
  }
  onVerify(data: any): Observable<any>{
    return  this._httpClient.put('Users/verify',data)
    
      
  }
  onForgetPassword(data:any) {
    return  this._httpClient.post('Users/Reset/Request',data)
    
  }
  onResetPassword(data:any) {
    return  this._httpClient.post('Users/Reset/Request',data)
    
  }
  onChangePassword(data: any) {
    return this._httpClient.put('Users/ChangePassword',data)
    
  }
  logOut() {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
    this._Router.navigate(['/auth/login'])
  }

}
