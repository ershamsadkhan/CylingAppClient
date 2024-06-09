import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title:string = 'Client';
  users:any;


  constructor(private http: HttpClient)
  {

  }
   
  ngOnInit(): void {
    
    this.http.post<UserResponse>('https://localhost:44321/api/v1/Users/GetUsers', {
      "pageNumber": 1,
      "pageSize": 10
    }).subscribe(
      {
        next: response => this.users = response.data,
        error: error => console.log(error),
        complete: () => console.log('Request has completed')
      }
    )
  }
  
}

interface UserResponse {
  success: boolean;
  errors: any;
  data: User[]; // Adjust according to the actual data type
}

interface User {
    id: string;
    userName: string;
    name: string;
    created: Date;
    email: string;
    phoneNumber: string;
}
