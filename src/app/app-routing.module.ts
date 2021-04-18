import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { WellcomeComponent } from "./components/wellcome/wellcome.component";
import { BoardComponent } from "./components/board/board.component";

const routes: Routes = [
  { path: "wellcome", component: WellcomeComponent },
  { path: "board", component: BoardComponent },
  { path: "**", redirectTo: "/wellcome", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
