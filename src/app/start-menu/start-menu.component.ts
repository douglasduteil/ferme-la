import { Component, HostListener, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "paf-start-menu",
  styleUrls: ["./start-menu.component.scss"],
  templateUrl: "./start-menu.component.html",
})
export class StartMenuComponent {

  private keysToStart = ["Enter", "Space"];
  constructor(
    private router: Router,
  ) {}

  @HostListener("window:keyup", ["$event"])
  public keyEvent(event: KeyboardEvent) {
    console.log(event);
    if (this.keysToStart.includes(event.key)) {
      this.router.navigate(["/game"]);
    }
  }
}
