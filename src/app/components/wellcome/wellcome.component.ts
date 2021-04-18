import { UserService } from "./../../services/user.service";
import { AfterViewInit, Component, ViewChild } from "@angular/core";

@Component({
  selector: "app-wellcome",
  template: `
    <div ngClass="wellcome-card">
      <h2>Memory Game</h2>
      <br /><br />
      <input
        #input
        type="text"
        name="name"
        placeholder="Enter Your Name"
        (input)="onInput($event.target.value)"
      /><br /><br />
      <a routerLink="/board" ngClass="disabled">
        <button #startbtn (click)="setName(input.value)">Start</button>
      </a>
    </div>
  `,
  styleUrls: ["./wellcome.component.css"],
})
export class WellcomeComponent implements AfterViewInit {
  @ViewChild("startbtn") startbtn;
  constructor(private uerService: UserService) {}

  ngAfterViewInit(): void {
    this.startbtn.nativeElement.className = "disabled";
  }

  onInput(value: string): void {
    const btnEl = this.startbtn.nativeElement;
    if (value === "") {
      btnEl.className = "disabled";
      btnEl.parentElement.className = "disabled";
    } else {
      this.startbtn.nativeElement.className = "";
      btnEl.parentElement.className = "";
    }
  }
  setName(name: string): void {
    this.uerService.setUserName = name;
  }
}
