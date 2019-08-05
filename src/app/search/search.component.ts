import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';



@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  search:string;
  users:any;
  result = false;
  constructor(private http:HttpService) { }

  ngOnInit() {
  }

  getResults(event: Event){
    this.search = (<HTMLInputElement>event.target).value;
    if (this.search.length > 2)
    {
    this.http.getSearchResult(this.search).subscribe(
      data =>{
        this.users = data["items"];
        this.result= true;
      },
      error =>{
        console.log(error);
      }
      
    )
    }
  }
}
