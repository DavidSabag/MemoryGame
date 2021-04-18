import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoardComponent } from './components/board/board.component';
import { ColorDirective } from './directives/color.directive';
import { WellcomeComponent } from './components/wellcome/wellcome.component';
import { ScoreboardComponent } from './components/scoreboard/scoreboard/scoreboard.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    ColorDirective,
    WellcomeComponent,
    ScoreboardComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
