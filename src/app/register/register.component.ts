import { Component } from '@angular/core';
import { FormGroup,FormControl,Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from '../service.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  currentUser:any
  constructor(private toster:ToastrService,private service:ServiceService)
  {

  }
  form=new FormGroup({
    email:new FormControl('',[Validators.email,Validators.required]),
    username:new FormControl("",Validators.required),
    password:new FormControl("",Validators.required)
  })
  register()
  {
    this.service.getUserByUsername(this.form.value.username).subscribe((d)=>{
      this.currentUser=d
      if(this.currentUser.length!=0)
      {
        this.toster.warning('User Already Exist')
      }
      else
      {
        this.service.userRegistration(this.form.value).subscribe((d)=>{
          console.log(d)
          this.toster.success('Registration Successful')
        },
        (e)=>{
          this.toster.warning('API ERROR')
        })
      }
    })
  }

}
