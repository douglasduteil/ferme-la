import { AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild } from "@angular/core";

const KEY_CODE = {
  A: 65,
};

const STARTING_VIDEO = [
  "assets/videos/0.webm",
];
const GOOD_END_VIDEO = [
  "assets/videos/0B.webm",
];
const BAD_END_VIDEO = [
  "assets/videos/1.webm",
];
let videoSpeed = 1;

@Component({
  selector: "paf-monitor",
  styleUrls: ["./monitor.component.scss"],
  templateUrl: "./monitor.component.html",
})
export class MonitorComponent implements AfterViewInit {
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

  public ngAfterViewInit() {
    const video: HTMLVideoElement = this.videoRef.nativeElement;
    setTimeout(() => {
      video.play();
    }, Math.random() * 5000);
  }

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

    this.endingVideoId = (this.endingVideoId + 1) % BAD_END_VIDEO.length;
    this.src = BAD_END_VIDEO[this.endingVideoId];
    video.load();
    video.playbackRate = videoSpeed++;
    this.isEndvideo = true;
    this.change.emit();
    this.message = "SUCCESS";
    setTimeout(() => {  video.play(); });
  }

  public onVideoEnd(event: HTMLVideoElementEventMap) {

    const video: HTMLVideoElement = this.videoRef.nativeElement;
    if (!this.isEndvideo) {
      this.src = GOOD_END_VIDEO[this.endingVideoId];
      this.endingVideoId = (this.endingVideoId + 1) % GOOD_END_VIDEO.length;
      video.load();
      video.playbackRate = videoSpeed;

      setTimeout(() => {  video.play(); });
      this.isEndvideo = true;
      return;
    }

    this.src = STARTING_VIDEO[this.startingVideoId];
    this.startingVideoId = (this.startingVideoId + 1) % STARTING_VIDEO.length;
    video.load();
    video.playbackRate = videoSpeed;
    this.isDirty = false;
    this.isEndvideo = false;
    this.message = "...";

    setTimeout(() => {
      video.play();
    }, Math.random() * 5000);
  }

  public onCanPlay($event) {
    console.log("onCanPlay", $event);
  }
}
