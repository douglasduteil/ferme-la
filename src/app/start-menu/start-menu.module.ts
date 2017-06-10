import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { StartMenuRoutingModule } from "./start-menu-routing.module";
import { StartMenuComponent } from "./start-menu.component";

@NgModule({
  declarations: [
    StartMenuComponent,
  ],
  imports: [
    CommonModule,
    StartMenuRoutingModule,
  ],
})
export class StartMenuModule { }
