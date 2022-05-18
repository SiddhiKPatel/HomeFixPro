import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { PagesService } from 'src/app/service/pages.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  forgotForm: FormGroup;
  submitted = false;
  constructor(private page: PagesService, 
    private router: Router,
    private toastr: ToastrService, 
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.forgotForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  get f() { return this.forgotForm.controls; }

  forgotSubmit() {
    this.submitted = true;
    // this.loginResponseError = null;
    console.log("loginSubmit", this.forgotForm);
    if (this.forgotForm.invalid) {
      return;
    } else {
      console.log("valid...");

      let formData = new FormData();
      formData.set('email', this.forgotForm.value.email);
      this.page.forgotPassword(formData).subscribe((res: any)=>{
        console.log(res);
        if(res.status){
          this.toastr.success(res.message);
          this.submitted = false;
          this.forgotForm.reset();
        }else if(res){
          this.toastr.error(res.message);
        }
      }, err=>{
        this.toastr.error('Server error, please try again later.');
        console.log(err);
      })
    }
  }

}
