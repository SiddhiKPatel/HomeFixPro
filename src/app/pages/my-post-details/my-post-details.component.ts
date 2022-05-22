import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { PagesService } from 'src/app/service/pages.service';

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

  constructor(private _location: Location, 
    private route: ActivatedRoute, 
    private router: Router,
    private apiService: ApiService,
    private pageService: PagesService) { }

  ngOnInit(): void {
    if (localStorage.getItem("token") == null) {
      this.router.navigate(['/login']);
    }
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);
    if (this.id) {
      this.getjobDetails(this.id);
    }
    this.token = localStorage.getItem("token");
  }

  getjobDetails(id) {
    const token = localStorage.getItem("token");
    let formData = new FormData();
    formData.set('id', id);
    this.pageService.myJobDetails(token, formData).subscribe((res: any) => {
      console.log(res);
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

  acceptMessage(jobproposal){
    console.log(jobproposal);
    let formData = new FormData();
    formData.set('code', jobproposal.code);
    this.apiService.messages(this.token, formData).subscribe((res:any)=>{
      console.log(res);
      if(res){
        this.router.navigate(['/inbox']);
      }
    }, err=>{
      console.log(err);
    })

  }

}
