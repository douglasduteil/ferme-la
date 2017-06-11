import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { EndComponent } from "./end.component";

const routes: Routes = [
  { path: "", component: EndComponent},
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class EndRoutingModule { }
