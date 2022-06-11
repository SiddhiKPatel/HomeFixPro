import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css']
})
export class CameraComponent implements OnInit {
  @Output() getPicture = new EventEmitter<WebcamImage>();
  showWebcam = true;
  isCameraExist = true;
  errors: WebcamInitError[] = [];
  private trigger: Subject<void> = new Subject<void>();
  private nextWebcam: Subject<boolean | string> = new Subject<boolean | string>();
  userId: string;

  constructor(private router: Router,
    private toastr: ToastrService,
    private userService: UserService,
    private spinner: NgxSpinnerService) { }


  ngOnInit(): void {
    WebcamUtil.getAvailableVideoInputs()
      .then((mediaDevices: MediaDeviceInfo[]) => {
        this.isCameraExist = mediaDevices && mediaDevices.length > 0;
      });
  }

  takeSnapshot(): void {
    this.trigger.next();
  }

  onOffWebCame() {
    this.showWebcam = !this.showWebcam;
  }

  handleInitError(error: WebcamInitError) {
    this.errors.push(error);
  }

  changeWebCame(directionOrDeviceId: boolean | string) {
    this.nextWebcam.next(directionOrDeviceId);
  }

  handleImage(webcamImage: WebcamImage) {
    this.getPicture.emit(webcamImage);
    const reader = new FileReader();
    const newFiles = webcamImage.imageAsDataUrl;
    const token = localStorage.getItem("token");
    this.userId = localStorage.getItem("userId");
    let formData = new FormData;
    formData.append('user_id', this.userId);
    formData.append('image', newFiles);
    this.userService.profileImageUpload(token, formData).subscribe((res: any) => {
      if (res.status) {
        this.toastr.success(res.message);
      } else if (res.message) {
        this.toastr.error(res.message);
      } else {
        this.toastr.error("Server error!! please try again later.");
      }
      this.router.navigate(['/edit-profile'])
      this.spinner.hide();
    }, err => {
      console.log(err);
      this.toastr.error(err.error.message);
    })
    this.showWebcam = false;
  }

  get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  get nextWebcamObservable(): Observable<boolean | string> {
    return this.nextWebcam.asObservable();
  }

}
