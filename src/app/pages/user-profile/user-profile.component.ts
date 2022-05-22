import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  profileData: any;
  countries: any = [];
  serviceListData: any = [];
  roleId: any;

  constructor(private userService: UserService,
    private router: Router,
    private apiService: ApiService) { }

  ngOnInit(): void {
    if (localStorage.getItem("token") == null) {
      this.router.navigate(['/login']);
    }
    this.roleId = localStorage.getItem("roleId");

    this.getProfile().then(() => {
      this.getServiceList();
    })
  }

  async getProfile() {
    const token = localStorage.getItem("token");
    // const user = { user_id: this.userId };
    this.userService.getProfile(token).subscribe((res: any) => {
      console.log(res);
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
    }, err => {
      console.log(err);
    })
  }

  async getServiceList() {
    const token = localStorage.getItem("token");
    // const user = { user_id: this.userId };
    this.apiService.serviceList(token).subscribe((res: any) => {
      console.log(res);
      if (res.status) {
        this.serviceListData = res;
      }
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
    this.router.navigate(['/']);
  }

}
