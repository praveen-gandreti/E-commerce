import { Component } from '@angular/core';
import { ServiceService } from '../service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  data:any
  products:any
  isEmpty:boolean=false
  constructor(private service:ServiceService,private router:Router,private toster:ToastrService)
  {
    let username:any=sessionStorage.getItem('username')
    username=username?.substring(1,username.length-1)
    this.service.getUserCartUsername(username).subscribe((d)=>{
      this.data=d
      this.products=this.data[0].cart
      if(this.products.length>0)
      this.isEmpty=true
      else
      this.isEmpty=false
    })
  }
  remove(item:any)
  {
    let currentuser:any
    let username:any=sessionStorage.getItem('username')
    username=username?.substring(1,username.length-1)
    this.service.getUserCartUsername(username).subscribe((d)=>{
      currentuser=d
      if(currentuser[0].cart.length==1)
      {
        this.isEmpty=false
      }
      
      
      let index = currentuser[0].cart.findIndex((obj:any) => obj.id === item.id);
      currentuser[0].cart.splice(index,1)
      console.log(currentuser[0].cart)
      this.service.updateUserCart(currentuser[0].id,currentuser[0]).subscribe((data)=>{
        this.toster.info("Item Removed From Cart")
        let username:any=sessionStorage.getItem('username')
    username=username?.substring(1,username.length-1)
    this.service.getUserCartUsername(username).subscribe((d)=>{
      this.data=d
      this.products=this.data[0].cart
    })
      },
      (error)=>{
        this.toster.info("SomeThing Wrong")
      }
      )  
    })
    
  }
  book(item:any)
  {
      let addTobook:any
      let username:any=sessionStorage.getItem('username')
      username=username?.substring(1,username.length-1)
      this.service.getUserCartUsername(username).subscribe((d)=>{
      addTobook=d
      console.log("***** BEFORE BOOKING")
      console.log(addTobook[0])
      addTobook[0].booking.push(item)
      console.log("******* AFTER BOOKING")
      console.log(addTobook[0])
      let index = addTobook[0].cart.findIndex((obj:any) => obj.id === item.id);
      addTobook[0].cart.splice(index,1)
      console.log("****** REMOVING FROM CART")
      console.log(addTobook[0])
      this.service.updateUserCart(addTobook[0].id,addTobook[0]).subscribe((ddd)=>{
        let username:any=sessionStorage.getItem('username')
      username=username?.substring(1,username.length-1)
      this.service.getUserCartUsername(username).subscribe((d)=>{
        this.data=d
        this.products=this.data[0].cart
        })
        this.toster.success("BOOKING SUCCESSFULL")
      })
      
      
    })
    this.isEmpty=false
    
  }

}
