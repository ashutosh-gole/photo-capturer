import { Component, OnInit } from '@angular/core';
import { WebcamImage } from 'ngx-webcam';
import { Subject, Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-web-camera',
  templateUrl: './web-camera.component.html',
  styleUrls: ['./web-camera.component.scss']
})
export class WebCameraComponent implements OnInit {
  public height = 400;
  public webcamImage: WebcamImage = null;
  private trigger: Subject<void> = new Subject<void>();
  public allowCameraSwitch = true;
  public imageList = [];

  constructor(
    breakpointObserver: BreakpointObserver
  ) {
    breakpointObserver.observe(['(max-width: 960px)']).subscribe(result => {
      if (result.matches) {
        this.height = 255;
      } else {
        this.height = 400;
      }
    });
  }

  ngOnInit(): void {
  }


  triggerSnapshot(): void {
    this.trigger.next();
  }

  handleImage(webcamImage: WebcamImage): void {
    this.webcamImage = webcamImage;
    this.imageList.push(this.webcamImage);
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  downloadImage(index, imageItem) {
    let base64ImagePath = imageItem._imageAsDataUrl;
    let fileName = `photo${index + 1}.jpg`;
    saveAs(base64ImagePath, fileName)
  }

  deleteImage(index) {
    this.imageList.splice(index, 1);
  }

}