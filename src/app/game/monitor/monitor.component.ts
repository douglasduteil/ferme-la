import { Component, ElementRef, HostListener, Input, OnInit, ViewChild } from "@angular/core";

const KEY_CODE = {
  A: 65,
};

const STARTING_VIDEO = [
  "assets/videos/skate_01.webm",
  "assets/videos/skate_02.webm",
];
const END_VIDEO = [
  "assets/videos/skate_03.webm",
];

@Component({
  selector: "paf-monitor",
  styleUrls: ["./monitor.component.scss"],
  templateUrl: "./monitor.component.html",
})
export class MonitorComponent {
  @ViewChild("videoRef")
  public videoRef: ElementRef;
  @Input()
  public letter: string;
  public startingVideoId = 0;
  public endingVideoId = 0;
  public isDirty = false;
  public isEndvideo = false;
  public src = STARTING_VIDEO[this.startingVideoId];

  @HostListener("window:keyup", ["$event"])
  public keyEvent(event: KeyboardEvent) {
    if (event.key !== this.letter) {
      return;
    }

    if (this.isDirty) {
      return;
    }

    this.isDirty = true;

    const video: HTMLVideoElement = this.videoRef.nativeElement;
    const qteTiem = video.duration - 1;

    if (video.currentTime < qteTiem) {
      return;
    }

    this.src = END_VIDEO[this.endingVideoId];
    this.endingVideoId = (this.endingVideoId + 1) % END_VIDEO.length;
    this.videoRef.nativeElement.load();
    this.isEndvideo = true;
  }

  public onVideoEnd(event: HTMLVideoElementEventMap) {
    this.src = STARTING_VIDEO[this.startingVideoId];
    this.startingVideoId = (this.startingVideoId + 1) % STARTING_VIDEO.length;
    this.videoRef.nativeElement.load();
    this.isDirty = false;
    this.isEndvideo = false;
  }
}