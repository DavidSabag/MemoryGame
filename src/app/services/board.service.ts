import { Injectable } from "@angular/core";
import {  BehaviorSubject } from "rxjs";
@Injectable({
  providedIn: "root",
})
export class BoardService {
  colors: Array<string> = [];
  seq: Array<Number> = [];
  clickCount: number = 0;
  _sequence = new BehaviorSubject<Number[]>([]);
  sequence$ = this._sequence.asObservable();

  constructor() {}

  getRandomColor(): string {
    let letters: string = "0123456789ABCDEF";
    let color: string = "#";
    for (let i: number = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    if (!this.colors.includes(color)) {
      this.colors.push(color);
      return color;
    } else {
      this.getRandomColor();// unique color
    }
  }

  appendSequence(): void{
    this.seq.push(Math.floor(Math.random() * 6))
    this._sequence.next(this.seq)
  }

  isClicksEquelsLen(): boolean{
    return this.clickCount === this.seq.length - 1;
  }

}
