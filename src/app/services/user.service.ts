import { BoardService } from "./board.service";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private userName: string = "";
  currScore: number = 0;
  bestScore: number = 0;
  isLost: boolean = false;
  scoreHistory: Array<number> = [];
  isReset: boolean = false
  constructor(private boardService: BoardService) {}

  set setUserName(name: string) {
    this.userName = name;
  }

  get getUserName() {
    return this.userName;
  }
  isNewRecored(): void {
    if (this.currScore > this.bestScore) {
      this.bestScore = this.currScore;
    }
  }
  updateCurrScore(points: number) {
    this.currScore += points;
    this.isNewRecored();
  }
  resetGame(): void {
    this.scoreHistory.push(this.currScore);
    this.scoreHistory = this.scoreHistory.sort((a, b) => b-a);
    this.currScore = 0;
    this.isLost = false;
    this.boardService.seq = [];
    this.boardService.clickCount = 0;
    this.boardService.appendSequence();
    this.isReset = true;
    
    
  }
}
