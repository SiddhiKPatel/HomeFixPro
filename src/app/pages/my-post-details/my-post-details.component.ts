import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { PagesService } from 'src/app/service/pages.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-my-post-details',
  templateUrl: './my-post-details.component.html',
  styleUrls: ['./my-post-details.component.css']
})
export class MyPostDetailsComponent implements OnInit {
  id: any;
  jobDetails: any;
  image_path: any;
  job_status_array: any;
  proposal_status_array: any;
  token: any;
  responseData: any;
  userDetails: any;
  UserData: any[] = [];
  vendorValue: any = [];
  constructor(private _location: Location,
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private pageService: PagesService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    if (localStorage.getItem("token") == null) {
      this.router.navigate(['/login']);
    }
    this.id = this.route.snapshot.paramMap.get('id');
    this.getUserDetail();
    if (this.id) {
      this.getjobDetails(this.id);
    }
    this.token = localStorage.getItem("token");
  }

  getjobDetails(id) {
    const token = localStorage.getItem("token");
    let formData = new FormData();
    formData.append('id', id);
    this.pageService.myJobDetails(token, formData).subscribe((res: any) => {
      if (res.status && res.response_data) {
        this.responseData = res;
        this.jobDetails = res.response_data;
        this.job_status_array = res.job_status_array ? res.job_status_array : [];
        this.proposal_status_array = res.proposal_status_array ? res.proposal_status_array : [];
        this.image_path = res.image_path ? res.image_path : '';
      }
    }, err => {
      console.log(err);
    })
  }
  getUserDetail() {
    this.pageService.getServices({}).subscribe((res: any) => {
      if (res.status && res.response_data) {
        this.userDetails = res.response_data.data;
        this.userDetails?.forEach(item => {
          this.jobDetails?.jobproposals?.forEach(element => {
            if (item.user?.id == element.user_id) {
              this.UserData.push(item.user)
            }
          });
        });
        this.vendorValue = this.UserData[0]
      }
    }, err => {
      console.log(err);
    })
  }

  acceptMessage(jobproposal) {
    let formData = new FormData();
    formData.append('code', jobproposal.code);
    this.apiService.messages(this.token, formData).subscribe((res: any) => {
      if (res) {
        this.router.navigate(['/inbox']);
      }
    }, err => {
      console.log(err);
    })

  }

  hire() {
    const token = localStorage.getItem("token");
    let obj = {
      user_id: this.vendorValue.id,
      job_id: this.jobDetails.id,
      id: this.jobDetails.jobproposals[0].id
    }
    this.pageService.hirePro(token, obj).subscribe((res: any) => {
      if (res.status) {
        this.toastr.success(res.message);
      }
    }, err => {
      console.log(err);
    })
  }

}
