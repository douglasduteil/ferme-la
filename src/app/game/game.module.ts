import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { GameRoutingModule } from "./game-routing.module";
import { GameComponent } from "./game.component";

import { MonitorComponent } from "./monitor/monitor.component";

@NgModule({
  declarations: [
    GameComponent,
    MonitorComponent,
  ],
  imports: [
    CommonModule,
    GameRoutingModule,
  ],
})
export class GameModule { }
