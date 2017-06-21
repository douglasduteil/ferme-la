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
  @ViewChild("videoBuffer1Ref")
  public videoBuffer1Ref: ElementRef;
  @ViewChild("videoBuffer2Ref")
  public videoBuffer2Ref: ElementRef;

  @Input()
  public letter: string;

  @Output()
  public change = new EventEmitter();

  //

  public activeBuffer = 2;
  public canload = 0;
  public startingVideoId = 0;
  public endingVideoId = 0;
  public isDirty = false;
  public isEndvideo = false;
  public message = "...";
  public buffer1src = STARTING_VIDEO[this.startingVideoId];
  public buffer2src = GOOD_END_VIDEO[this.startingVideoId];

  public ngAfterViewInit() {
    setTimeout(() => {
      this.switchVideo(STARTING_VIDEO[this.startingVideoId]);
      const video: HTMLVideoElement = this.getCurrentRunningVideo();
      video.play();
    }, 1000 + (Math.random() * 5000));
  }

  @HostListener("window:keyup", ["$event"])
  public keyEvent(event: KeyboardEvent) {
    if (event.key !== this.letter) {
      return;
    }

    if (this.isDirty || this.isEndvideo) {
      return;
    }

    this.isDirty = true;

    const video: HTMLVideoElement = this.getCurrentRunningVideo();
    const qteTiem = video.duration - 1;

    if (video.currentTime < qteTiem) {
      this.message = "FAIL";
      return;
    }

    video.pause();
    this.endingVideoId = (this.endingVideoId + 1) % BAD_END_VIDEO.length;
    this.switchVideo(BAD_END_VIDEO[this.endingVideoId]);
    this.isEndvideo = true;
    this.change.emit();
    this.message = "SUCCESS";
  }

  public onVideoEnd(event: HTMLVideoElementEventMap) {

    let video: HTMLVideoElement;
    if (!this.isEndvideo) {
      this.switchVideo(GOOD_END_VIDEO[this.endingVideoId])
      this.endingVideoId = (this.endingVideoId + 1) % GOOD_END_VIDEO.length;
      video = this.getCurrentRunningVideo();
      video.playbackRate = videoSpeed;

      this.isEndvideo = true;
      return;
    }

    video = this.getCurrentRunningVideo();
    video.classList.remove('visible');

    this.message = "...";

    const nextVictim = () => {
      this.switchVideo(STARTING_VIDEO[this.startingVideoId]);
      this.startingVideoId = (this.startingVideoId + 1) % STARTING_VIDEO.length;
      video = this.getCurrentRunningVideo();
      video.playbackRate = videoSpeed;
      this.isDirty = false;
      this.isEndvideo = false;
    }

    setTimeout(nextVictim, 3000 + (Math.random() * 5000));
  }

  public onCanPlay($event) {
    console.log("onCanPlay", $event);
  }

  private getCurrentRunningVideo () : HTMLVideoElement {
    return [
      , // LOL
      this.videoBuffer1Ref.nativeElement,
      this.videoBuffer2Ref.nativeElement
    ][this.activeBuffer];
  }

  private switchVideo(newVideo) {
    this.activeBuffer = 1 + ((this.activeBuffer + 4) % 2);
    const [front, back]: [HTMLVideoElement, HTMLVideoElement] = this.activeBuffer === 1 ?
      [this.videoBuffer1Ref.nativeElement, this.videoBuffer2Ref.nativeElement] :
      [this.videoBuffer2Ref.nativeElement, this.videoBuffer1Ref.nativeElement] ;

    front.src = newVideo;
    front.onplay = () => {
      requestAnimationFrame(() => {
        front.classList.add('visible');
        front.style.zIndex = '2';
        back.classList.remove('visible');
        back.style.zIndex = '1';
      })
    }
    front.oncanplay = () => {
      front.play();
      back.pause();
    }
  }
}
