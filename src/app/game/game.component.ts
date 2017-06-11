import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { GameService } from "app/game.service";

const GAME_DURATION = 1000 * 20;
@Component({
  selector: "paf-game",
  styleUrls: ["./game.component.scss"],
  templateUrl: "./game.component.html",
})
export class GameComponent implements OnInit {
  public score = 0;
  public rawDuration = GAME_DURATION;
  public duration = "";
  public percentTime = "100%";

  constructor(
    private router: Router,
    private game: GameService,
  ) {}

  public onChange(event) {
    this.score++;
  }

  public ngOnInit() {
    let lastDuration = performance.now();

    const gameComponentAnimationFrame = () => {
      if (this.rawDuration > 0) {
        requestAnimationFrame(gameComponentAnimationFrame);
      } else {
        this.onGameTimerFinished();
      }

      const now = performance.now();
      const frameDuration = now - lastDuration;
      lastDuration = now;

      this.rawDuration -= frameDuration;
      this.percentTime = ((this.rawDuration / GAME_DURATION) * 100) + "%";
    };
    setTimeout(() => requestAnimationFrame(gameComponentAnimationFrame), 0);
  }

  public onGameTimerFinished() {
    this.game.score = this.score;
    this.router.navigate(["/end"]);
  }
}
