import { Component, OnInit } from '@angular/core';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Router } from '@angular/router';
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'githubClient';
  isLoggedIn;
  constructor(private router: Router, private http:HttpService){
  }
  navigateUser(){
    let username = Cookie.get('username');
    this.router.navigate(['user', username]);
  }
  navigateSearch(){
    this.router.navigate(['search']);
  }


  logout(){
    Cookie.delete('authHash');
    this.isLoggedIn = false;
    this.http.isLoggedIn.next(false);
  }

  ngOnInit(){
    this.http.getLoggedInStatus().subscribe(
      value =>{
        this.isLoggedIn = value;
      }
    )
  }
}
