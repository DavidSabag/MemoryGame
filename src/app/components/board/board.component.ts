import { UserService } from "./../../services/user.service";
import { BoardService } from "./../../services/board.service";
import { AfterViewInit, Component, OnInit, ViewChildren } from "@angular/core";
import { LightBulb } from "../../models/light-bulb.model";
import { Router } from "@angular/router";
import { ColorDirective } from "./../../directives/color.directive";

@Component({
  selector: "app-board",
  template: `
    <app-sidebar></app-sidebar>
    <div ngClass="main">
      <app-scoreboard></app-scoreboard>
      <div ngClass="game-board" *ngIf="!this.userService.isLost; else lost">
        <div
          (showSeq)="glowSequence()"
          id="{{ bulb.id }}"
          appColor
          [bulb]="bulb"
          ngClass="bulb"
          *ngFor="let bulb of this.board"
        ></div>
      </div>
    </div>

    <ng-template #lost>
      <div>
        <h1>Game Over</h1>
        <button ngClass="restart-btn" (click)="this.userService.resetGame()">
          Restart
        </button>
      </div>
    </ng-template>
  `,
  styleUrls: ["./board.component.css"],
})
export class BoardComponent implements OnInit {
  @ViewChildren(ColorDirective) colorDirectives = null;
  board: Array<LightBulb> = [];
  BORAD_LENGTH: number = 6;
  

  constructor(
    public boardService: BoardService,
    public userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const username = this.userService.getUserName;
    if (username !== "") {
      this.createBoard();
      this.boardService.appendSequence();
    } else {
      this.router.navigateByUrl("/wellcome");
    }
  }

  createBoard(): void {
    for (let i: number = 0; i < this.BORAD_LENGTH; i++) {
      this.board.push({
        id: i,
        color: this.boardService.getRandomColor(),
      });
    }
  }

  async glowSequence(): Promise<void> {

    for (let val of this.boardService.seq) {
      let bulb = this.colorDirectives.find(
        (bulb) => Number(bulb.el.nativeElement.id) === val
      );
      bulb.el.nativeElement.style.backgroundColor = bulb.bulb.color;
      await new Promise((r) => setTimeout(r, 1000)); //sleep
      bulb.el.nativeElement.style.backgroundColor = "white";
      await new Promise((r) => setTimeout(r, 1000)); //sleep
    }
  }
}
