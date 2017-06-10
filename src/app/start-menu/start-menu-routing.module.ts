import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { StartMenuComponent } from "./start-menu.component";

const routes: Routes = [
  { path: "", component: StartMenuComponent},
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class StartMenuRoutingModule { }
