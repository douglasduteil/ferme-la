import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "start-menu"},
  { path: "start-menu", loadChildren: "app/start-menu/start-menu.module#StartMenuModule" },
  { path: "game", loadChildren: "app/game/game.module#GameModule" },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes, { useHash: true })],
})
export class AppRoutingModule { }
