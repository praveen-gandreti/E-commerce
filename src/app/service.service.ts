import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  ob=new Subject();
  log=new Subject()

  sendQueryParmsData(data:any)
  {
    this.ob.next(data)
  }
  constructor(private http:HttpClient) { }

  getAllProducts()
  {
    return this.http.get('https://fakestoreapi.com/products')
  }
  getUserByUsername(username:any)
  {
    return this.http.get('http://localhost:3000/users?username='+username)
  }
  addItemCart(id:any,item:any)
  {
    return this.http.put('http://localhost:3000/UserCart/'+id,item)
  }
  getUserCartUsername(username:any)
  {
    return this.http.get('http://localhost:3000/UserCart?username='+username)
  }
  userRegistration(user:any)
  {
    return this.http.post('http://localhost:3000/users',user)
  }
  getUserByEmail(email:any)
  {
    return this.http.get('http://localhost:3000/users?email='+email)
  }
  isLoggedIn()
  {
    return sessionStorage.getItem('username')?sessionStorage.getItem('username'):''
  }
  checkLog()
  {
    this.log.next('yes')
  }
  logOut()
  {
    sessionStorage.clear()
  }
  updateUserCart(id:any,item:any)
  {
    return this.http.put('http://localhost:3000/UserCart/'+id,item)
  }

  
}
