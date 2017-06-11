import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

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

  constructor(
    private router: Router,
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
      this.duration = (this.rawDuration / 1000).toFixed(0);
    };
    setTimeout(() => requestAnimationFrame(gameComponentAnimationFrame), 0);
  }

  public onGameTimerFinished() {
    this.router.navigate(["/end"]);
  }
}
