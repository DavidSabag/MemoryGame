import { UserService } from "./../../../services/user.service";
import { Component } from "@angular/core";

@Component({
  selector: "app-scoreboard",
  template: `
    <div ngClass="score-board">
      <h2>Name: </h2><h2>{{ this.userService.getUserName }} </h2>
      <h2 ngClass="curr" >Current Score: </h2> <h2 ngClass="curr">{{ this.userService.currScore }}</h2>
      <h2 ngClass="best">Best Score: </h2> <h2 ngClass="best"> {{ this.userService.bestScore }}</h2>
    </div>
  `,
  styles: [
    `
      .score-board {
        position: relative;
        margin: 10px 10px 10px 0;
        display: grid;
        grid-template-columns: 175px 160px;
        grid-template-rows: 50px 50px 50px;
      }
      h2 {
        text-align: left;
        color: white;
        font-family: Arial;
        margin: 0
      }
      .curr{
        color: yellow
      }
      .best{
        color: #54DF6C
      }
    `,
  ],
})
export class ScoreboardComponent {
  constructor(public userService: UserService) {}
}
