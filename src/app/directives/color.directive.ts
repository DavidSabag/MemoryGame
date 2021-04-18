import { UserService } from "./../services/user.service";
import { BoardService } from "./../services/board.service";
import { Directive, ElementRef, HostListener, Input } from "@angular/core";
import { LightBulb } from "../models/light-bulb.model";
import { BoardComponent } from "./../components/board/board.component"

@Directive({
  selector: "[appColor]",
})
export class ColorDirective {
  @Input() bulb: LightBulb;
  
  defaultColor: string = "white";

  @HostListener("click") async onClick() {
    if (this.boardService.isClicksEquelsLen()) {
      this.isCorrectOrder()
        ? this.userService.updateCurrScore(10) // win
        : (this.userService.isLost = true);
      this.boardService.clickCount = 0;
      this.glow(1000);
      await new Promise((r) => setTimeout(r, 2000)); //sleep
      await this.boardComponent.glowSequence()
      this.boardService.appendSequence();

    } else {
      this.glow(1000);
      this.isCorrectOrder()
        ? (this.userService.isLost = false)
        : (this.userService.isLost = true);
      this.boardService.clickCount++;
    }
  }

  @HostListener("change") ngOnChanges() {
    this.showNext();
  }

  constructor(
    private el: ElementRef,
    private boardService: BoardService,
    private userService: UserService,
    private boardComponent:BoardComponent
  ) {
    this.el.nativeElement.style.backgroundColor = this.defaultColor;
  }

  glow(time): void {
    this.el.nativeElement.style.backgroundColor = this.bulb.color;
     setTimeout(() => {
      this.el.nativeElement.style.backgroundColor = this.defaultColor;
    }, time);
    
  }

  showNext(): void {
    this.boardService.sequence$.subscribe((seq) => {
      const lastSeq = seq[seq.length - 1];
      if (lastSeq === this.bulb.id) {
        seq.length - 1 === 0 ? this.glow(2000) : this.glow(1000);
      }
    });
  }

  isCorrectOrder(): boolean {
    const click = this.boardService.clickCount;
    return this.boardService.seq[click] === this.bulb.id;
  }
}
