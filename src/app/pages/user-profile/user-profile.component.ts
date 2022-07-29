import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { WebcamImage } from 'ngx-webcam';
import { ApiService } from 'src/app/service/api.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  webcamImage: WebcamImage | undefined;
  profileData: any;
  countries: any = [];
  serviceListData: any = [];
  roleId: any;
  userId: string;
  userRating: any;
  averageRating: any;

  constructor(private userService: UserService,
    private router: Router,
    private apiService: ApiService,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    if (localStorage.getItem("token") == null) {
      this.router.navigate(['/login']);
    }
    this.roleId = localStorage.getItem("roleId");
    this.userId = localStorage.getItem("userId");
    this.getProfile().then(() => {
      this.getServiceList();
      this.getRating();
    })
  }

  async getProfile() {
    this.spinner.show();
    const token = localStorage.getItem("token");
    // const user = { user_id: this.userId };
    this.userService.getProfile(token).subscribe((res: any) => {
      if (res.status) {
        this.countries = res.countries;
        // this.image_path  = res.image_path;
        this.profileData = res.response_data;
        // this.skills = res.skills;
        // this.selectedSkills = res.response_data.skill;
        // if(this.profileData && this.countries){
        //   this.profileSecOne.patchValue(this.profileData);
        // }
      }
      this.spinner.hide();
    }, err => {
      console.log(err);
    })
  }

  async getServiceList() {
    this.spinner.show();
    const token = localStorage.getItem("token");
    // const user = { user_id: this.userId };
    this.apiService.serviceList(token).subscribe((res: any) => {
      if (res.status) {
        this.serviceListData = res;
      }
      this.spinner.hide();
    }, err => {
      console.log(err);
    })
  }
  getRating() {
    const token = localStorage.getItem("token");
    let obj = { user_id: this.userId }
    this.apiService.getRating(token, obj).subscribe((res: any) => {
      this.averageRating = res.response_data.average_rating
      this.userRating = res.response_data.user_rating;
      console.log(this.userRating)
    }, err => {
      console.log(err);
    })
  }
  message() {
    this.router.navigate(['/inbox']);
  }

  findPros() {
    this.router.navigate(['/search-result'], { queryParams: { keyword: 'all', zipcode: '' } })
  }

  getEstimate() {
    this.router.navigate(['/estimates']);
  }
}
