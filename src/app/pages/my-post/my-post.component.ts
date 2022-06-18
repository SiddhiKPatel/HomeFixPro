import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-my-post',
  templateUrl: './my-post.component.html',
  styleUrls: ['./my-post.component.css']
})
export class MyPostComponent implements OnInit {
  jobData: any;
  myJobList: any = [];
  constructor(private router: Router,
    private toastr: ToastrService, 
    private apiService: ApiService, 
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    if (localStorage.getItem("token") == null) {
      this.router.navigate(['/login']);
    }
    this.getMyJobs();
  }

  getMyJobs(){
    const token = localStorage.getItem("token");
    this.apiService.myJob(token, {}).subscribe((res: any) => {
      if (res.status) {
        this.jobData = res;
        this.myJobList = res.response_data.data ? res.response_data.data : [];
      } else if (res.message) {
        this.toastr.error(res.message);
      } else {
        this.toastr.error("Server error!! please try again later.");
      }
    }, err => {
      console.log(err);
      this.toastr.error(err.error.message);
    })
  }


}
