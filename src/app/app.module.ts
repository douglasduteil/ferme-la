import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { GameService } from "app/game.service";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

@NgModule({
  bootstrap: [
    AppComponent,
  ],
  declarations: [
    AppComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
  ],
  providers: [
    GameService,
  ],
})
export class AppModule { }
