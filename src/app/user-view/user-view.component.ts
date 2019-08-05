import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit {

  userId;
  userInfo;
  userRepoInfo;
  userStarRepoInfo;
  userGistInfo;
  userFollowerInfo;
  constructor(private http:HttpService,private _route:ActivatedRoute, private router:Router) { }

  ngOnInit() {
   
    this._route.paramMap.subscribe(params =>{
    this.userId = params.get('userId');  
    this.getCompleteUserInfo();
    this.getUserRepos();
    this.getUserGists();
    this.getUserFollowers();
    this.getUserStarRepos();    
    })
    
    
  }
  getUserRepos(){
    this.http.getAllUserRepos(this.userId).subscribe(
      data =>{
        this.userRepoInfo = data;
      },
      error =>{
        console.log(error);
      }
    )
  }
  getUserStarRepos(){
    this.http.getAllUserStarRepos(this.userId).subscribe(
      data =>{
        this.userStarRepoInfo = data;
      },
      error =>{
        console.log(error);
      }
    )
  }
  getUserGists(){
    this.http.getAllUserGists(this.userId).subscribe(
      data =>{
        this.userGistInfo = data;
      },
      error =>{
        console.log(error);
      }
    )
  }
  getUserFollowers(){
    this.http.getAllUserFollowers(this.userId).subscribe(
      data =>{
        this.userFollowerInfo = data;
      },
      error =>{
        console.log(error);
      }
    )
  }
  getCompleteUserInfo(){
  this.http.getUserInfo(this.userId).subscribe(
    data =>{
      this.userInfo = data;
    },
    error =>{
      console.log(error);
    }
  )
}



}
