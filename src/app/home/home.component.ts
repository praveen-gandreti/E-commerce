import { Component,OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  qparam:any
  data:any
  isLoggedIn=false
  men:string="men's clothing"
  women="women's clothing"
  //"electronics"
  //"jewelery"
  constructor(private router:Router,private service:ServiceService,private act:ActivatedRoute,private toster:ToastrService)
  {
    this.router.navigate(['products'])
    this.isLoggedIn=false
  }
  send()
  {
    this.service.sendQueryParmsData("sended");
  }
  logout()
  {
    this.toster.success("Logout Successfully")
    this.router.navigate(['products'])
    this.isLoggedIn=!this.isLoggedIn
    sessionStorage.clear()

  }
  ngOnInit(): void
  {
    this.service.log.subscribe((d)=>
    {
      this.isLoggedIn=false
    })
  };
}
