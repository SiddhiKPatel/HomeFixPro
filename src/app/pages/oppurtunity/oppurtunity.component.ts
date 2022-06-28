import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-oppurtunity',
  templateUrl: './oppurtunity.component.html',
  styleUrls: ['./oppurtunity.component.css']
})
export class OppurtunityComponent implements OnInit {
  jobData: any;
  opportunityList: any = [];
  projectSelect: any = 'active';
  sUsername: any;
  activeJobFlag = false
  constructor(private router: Router,
    private toastr: ToastrService,
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem("token") == null) {
      this.router.navigate(['/login']);
    }
    this.spinner.show();
    this.activatedRoute.queryParams.subscribe(params => {
      if (params && params['p'] && (params['p'] == 'active' || params['p'] == 'sent')) {
        this.projectSelect = params['p'];
        if (this.projectSelect == 'sent') {
          this.getMyJobs();
        } else {
          this.getAllJobs();
        }
      } else {
        this.getAllJobs();
      }
      this.spinner.hide();
    });
  }

  activeJob() {
    this.router.navigate(['/opportunity'], { queryParams: { p: 'active' } });
  }

  sentJob() {
    this.router.navigate(['/opportunity'], { queryParams: { p: 'sent' } });
  }

  getAllJobs() {
    this.spinner.show();
    const token = localStorage.getItem("token");
    let obj = {
      param: '',
      category_id: '',
      delivery_time_id: '',
      filter_string: this.sUsername ? this.sUsername : ''
    }
    this.apiService.getAllJobs(token, obj).subscribe((res: any) => {
      if (res.status) {
        this.activeJobFlag = true;
        this.jobData = res;
        this.opportunityList = res.response_data.data ? res.response_data.data : [];
        this.spinner.hide();
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

  getMyJobs() {
    this.spinner.show();
    const token = localStorage.getItem("token");
    this.apiService.myProposal(token, {}).subscribe((res: any) => {
      if (res.status) {
        this.activeJobFlag = false
        this.jobData = res;
        this.opportunityList = res.response_data.data ? res.response_data.data : [];
      } else if (res.message) {
        this.toastr.error(res.message);
      } else {
        this.toastr.error("Server error!! please try again later.");
      }
      this.spinner.hide();
    }, err => {
      console.log(err);
      this.toastr.error(err.error.message);
    })
  }
}
