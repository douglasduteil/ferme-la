import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from "@angular/core";

const KEY_CODE = {
  A: 65,
};

const STARTING_VIDEO = [
  "assets/videos/paf_2A.webm",
  "assets/videos/paf_1A.webm",
];
const GOOD_END_VIDEO = [
  "assets/videos/paf_1B.webm",
];
const BAD_END_VIDEO = [
  "assets/videos/paf_2B.webm",
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

  @Output()
  public change = new EventEmitter();

  public startingVideoId = 0;
  public endingVideoId = 0;
  public isDirty = false;
  public isEndvideo = false;
  public message = "...";
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
      this.message = "FAIL";
      return;
    }

    this.src = BAD_END_VIDEO[this.endingVideoId];
    this.endingVideoId = (this.endingVideoId + 1) % BAD_END_VIDEO.length;
    this.videoRef.nativeElement.load();
    this.isEndvideo = true;
    this.change.emit();
    this.message = "SUCCESS";
  }

  public onVideoEnd(event: HTMLVideoElementEventMap) {
    if (!this.isEndvideo) {
      this.src = GOOD_END_VIDEO[this.endingVideoId];
      this.endingVideoId = (this.endingVideoId + 1) % GOOD_END_VIDEO.length;
      this.videoRef.nativeElement.load();
      this.isEndvideo = true;
      return;
    }

    this.src = STARTING_VIDEO[this.startingVideoId];
    this.startingVideoId = (this.startingVideoId + 1) % STARTING_VIDEO.length;
    this.videoRef.nativeElement.load();
    this.isDirty = false;
    this.isEndvideo = false;
    this.message = "...";
  }
}
