import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-job-post-page',
  templateUrl: './job-post-page.component.html',
  styleUrls: ['./job-post-page.component.css']
})
export class JobPostPageComponent implements OnInit {
  jobPostForm: FormGroup;
  submitted = false;
  jobPageData: any;
  image: any;
  imageLoaded = false;

  constructor(private router: Router,
    private toastr: ToastrService, 
    private apiService: ApiService, 
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.jobPostForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      category_id: ['', [Validators.required]],
      delivery_time_id: ['', [Validators.required]],
      status: [1, [Validators.required]],
      body: ['', [Validators.required]],
      img_choose: ['']
    });
    this.getJobDetails();
  }

  getJobDetails() {
    const token = localStorage.getItem("token");
    this.apiService.addJobDetails(token, {}).subscribe((res: any) => {
      console.log(res);
      if (res.status) {
        this.jobPageData = res;
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
  get f() { return this.jobPostForm.controls; }

  addJob() {
    this.jobPostForm.value.status = 1;
    this.submitted = true;
    console.log("addJob", this.jobPostForm);
    if (this.jobPostForm.invalid) {
      return;
    } else {
      console.log("valid...");
      const token = localStorage.getItem("token");
      let formData = new FormData();
      formData.set('id', '0');
      formData.set('title', this.jobPostForm.value.title);
      formData.set('category_id', this.jobPostForm.value.category_id);
      formData.set('delivery_time_id', this.jobPostForm.value.delivery_time_id);
      formData.set('status', this.jobPostForm.value.status);
      formData.set('body', this.jobPostForm.value.body);
      if(this.imageLoaded){
        formData.set('image', this.image);
        formData.set('galleryimage[]', this.image);
      }

      this.apiService.addUpdateJob(token, formData).subscribe((res: any) => {
        console.log(res);
        if (res.status) {
          this.toastr.success(res.message);
          this.submitted = false;
          this.imageLoaded = false;
          this.jobPostForm.reset();
        } else if (res.message) {
          this.toastr.error(res.message);
        } else {
          this.toastr.error("Server error!! please try again later.");
        }
      }, err => {
        console.log(err);
        this.toastr.error(err.error.message);
      });
    }
  }

  importFile(event) {
    if (event.target.files && event.target.files.length > 0) {
      let files = event.target.files || event.dataTransfer.files;
      if (!files.length)
        return;
      var fileName = files[0].name.toUpperCase();
      console.log(fileName.endsWith);
      if (fileName.endsWith(".JPG") || fileName.endsWith(".JPEG") || fileName.endsWith(".PNG")) {
        this.image = files[0];
        this.imageLoaded = true;
      } else {
        this.image = null;
        this.toastr.error("Please select a valid image file jpeg/jpg/png");
      }
    }

  }

}
