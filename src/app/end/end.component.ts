import { Component, HostListener, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { GameService } from "app/game.service";

@Component({
  selector: "paf-end",
  styleUrls: ["./end.component.scss"],
  templateUrl: "./end.component.html",
})
export class EndComponent {
  constructor(
    private router: Router,
    public game: GameService,
  ) {}
  @HostListener("window:keyup", ["$event"])
  public keyEvent(event: KeyboardEvent) {
    if (event.key === " ") {
      this.router.navigate(["/game"]);
    }
    if (event.key === "ArrowUp") {
      this.router.navigate(["/start-menu"]);
    }
  }
}
