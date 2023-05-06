import { Component ,OnInit} from '@angular/core';
import { ServiceService } from '../service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{
  queryparam=null
  items:any
  cor:number=3
  products:any|undefined
  constructor(private service:ServiceService,private parms:ActivatedRoute,private router:Router,private toster:ToastrService)
  {
    
  }
  ngOnInit(): void
  {
    this.service.getAllProducts().subscribe((d)=>{
      this.products=d
      this.items=this.products
    })
    this.service.ob.subscribe((dd)=>{
      this.parms.queryParamMap.subscribe((x)=>{
        this.filterData(x.get('category'))
      })
    })
  }
  filterData(q:any)
  {
    if(q)
    {
      if(q=="men")
      q="men's clothing"
      else if(q=="women")
      q="women's clothing"
      this.items=this.products.filter((x:any)=>{
        return x.category==q
      })
    }
    else
    {
      this.items=this.products
    }
  }
  addCart(id:any)
  {

    if(this.service.isLoggedIn()?.length!=0)
    {
      let currentuser:any
      let currentusercart:any
      let username:any=sessionStorage.getItem('username')
      username=username?.substring(1,username.length-1)
      this.service.getUserByUsername(username).subscribe((d)=>{
        currentuser=d
        this.service.getUserCartUsername(currentuser[0].username).subscribe((y)=>{
          currentusercart=y
          currentusercart[0].cart.push(id)
          this.service.addItemCart(currentusercart[0].id,currentusercart[0]).subscribe((xx)=>{
            this.toster.success("Added to cart")
          })
        })
      })
      
    }
    else
    {
      this.toster.warning('Please Login To Continue Shopping')
      this.router.navigate(['/login'])
    }
  }
  book(item:any)
  {
    if(this.service.isLoggedIn()?.length!=0)
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
          this.service.updateUserCart(addTobook[0].id,addTobook[0]).subscribe((ddd)=>{
                this.toster.success("BOOKING SUCCESSFULL")
          })
      })
    }
    else
    {
      this.toster.warning('Please Login To Continue Shopping')
      this.router.navigate(['/login'])
    }
  }
}
