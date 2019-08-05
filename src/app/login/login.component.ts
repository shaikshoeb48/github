import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import{ HttpHeaders } from '@angular/common/http';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  isLoggedIn;
  constructor(private http: HttpService, private router:Router, private toastr: ToastrService) { }

  ngOnInit() {
    this.http.getLoggedInStatus().subscribe(
      value =>{
        this.isLoggedIn = value;
      }
    )
  }

//on clicking the submit button
onSubmit(){
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic '+ btoa(this.username+':'+this.password) 
      })
    };
    Cookie.set('authHash', btoa(this.username+':'+this.password))
    this.http.authenticatingUser(httpOptions).subscribe(
      data => {
        Cookie.set('username', data['login']);
        this.router.navigate(['user', data['login']]);
        this.http.isLoggedIn.next(true);
        this.toastr.success(' Logged In', 'Welcome!');
      },
      error =>{
        console.log(error);
        if(error.status == 401){
          this.toastr.error('Invalid Credentials');
        }
      }
      
    )   
  }

}
