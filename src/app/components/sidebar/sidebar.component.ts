import { UserService } from "./../../services/user.service";
import { Component, OnInit } from "@angular/core";
import { interval } from "rxjs";

@Component({
  selector: "app-sidebar",
  template: `
    <div class="sidenav">
      <h3>Name: {{ this.userService.getUserName }}</h3>
      <h3>{{ this.date }}</h3>
      <h3>{{ this.time }}</h3>
      <ul>
        <li *ngFor="let score of this.userService.scoreHistory; let i = index">
          Game {{ i + 1 }} Score: {{ score }}
        </li>
      </ul>
    </div>
  `,
  styleUrls: ["./sidebar.component.css"],
})
export class SidebarComponent implements OnInit {
  date: string = "";
  time: string = "";
  constructor(public userService: UserService) {}

  ngOnInit(): void {
    let date: Date = new Date();
    this.date = `${date.getDate()} / ${
      date.getMonth() + 1
    } / ${date.getFullYear()}`;
    
    this.time = `${this.prittyTime(date.getHours())}:${this.prittyTime(date.getMinutes())}:${this.prittyTime(date.getSeconds())}`
    interval(1000).subscribe(
      () =>{
        let date:Date = new Date();
        (this.time = `${this.prittyTime(date.getHours())}:${this.prittyTime(date.getMinutes())}:${this.prittyTime(date.getSeconds())}`)
      });
  }
  prittyTime(time:number){
    let ptime:string = "" + time;
    if(ptime.length === 1){
      return "0"+ptime
    }
    return ptime;
  }

}
