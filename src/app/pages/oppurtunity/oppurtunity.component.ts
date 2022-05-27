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
      console.log(params);
      console.log(params['p']);
      if(params && params['p'] && (params['p']== 'active' || params['p'] == 'sent')){
        this.projectSelect = params['p'];
        if(this.projectSelect == 'sent'){
          this.getMyJobs();
        }else{
          this.getAllJobs();
        }
      }else{
        this.getAllJobs();
      }
      this.spinner.hide();
    });
  }

  activeJob(){
    this.router.navigate(['/opportunity'], { queryParams: { p: 'active' } });  
  }

  sentJob(){
    this.router.navigate(['/opportunity'], { queryParams: { p: 'sent' } });  
  }

  getAllJobs() {
    this.spinner.show();
    const token = localStorage.getItem("token");
    this.apiService.getAllJobs(token, {}).subscribe((res: any) => {
      console.log(res);
      if (res.status) {
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

  getMyJobs(){
    this.spinner.show();
    const token = localStorage.getItem("token");
    this.apiService.myJob(token, {}).subscribe((res: any) => {
      console.log(res);
      if (res.status) {
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
