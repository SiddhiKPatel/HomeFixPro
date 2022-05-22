import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api.service';
import { PagesService } from 'src/app/service/pages.service';

@Component({
  selector: 'app-project-status',
  templateUrl: './project-status.component.html',
  styleUrls: ['./project-status.component.css']
})
export class ProjectStatusComponent implements OnInit {
  proposalList: any = [];
  responseData: any;
  roleId: any;
  jobList: any = [];
  constructor(private _location: Location,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private pageService: PagesService) { }

  ngOnInit(): void {
    if (localStorage.getItem("token") == null) {
      this.router.navigate(['/login']);
    }
    this.getMyProposal();
  }

  getMyProposal() {
    let token = localStorage.getItem("token");
    this.roleId = localStorage.getItem("roleId");
    if (this.roleId == 2) {
      this.apiService.myProposal(token, {}).subscribe((res: any) => {
        console.log(res);
        this.responseData = res;
        this.proposalList = res.response_data.data;
      }, err => {
        console.log(err);
      })
    } else if(this.roleId == 3){
      this.apiService.myJob(token, {}).subscribe((res: any) => {
        console.log(res);
        this.responseData = res;
        this.jobList = res.response_data.data;
      }, err => {
        console.log(err);
      })
    }
  }

}
