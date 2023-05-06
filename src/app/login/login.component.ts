import { Component } from '@angular/core';
import { FormGroup,FormControl,Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from '../service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  currentUser:any
  constructor(private toster:ToastrService,private service:ServiceService,private router:Router)
  {

  }
  form=new FormGroup({
    username:new FormControl("",Validators.required),
    password:new FormControl("",Validators.required)
  })
  login()
  {
    this.service.getUserByUsername(this.form.value.username).subscribe((d)=>{
      this.currentUser=d
      if(this.currentUser.length!=0)
      {
        if(this.form.value.password==this.currentUser[0].password)
        {
          sessionStorage.setItem('username',JSON.stringify(this.form.value.username))
          this.toster.success('Login success')
          this.service.checkLog();
          
          this.router.navigate(['/products'])
          console.log(sessionStorage.getItem('username'))
        }
        else
        {
          this.toster.warning('Password mismatch')
        }
      }
      else
        this.toster.warning('Details Not Found')
      
    })
    
  }
}
