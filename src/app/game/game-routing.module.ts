import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { GameComponent } from "./game.component";

const routes: Routes = [
  { path: "", component: GameComponent},
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class GameRoutingModule { }
