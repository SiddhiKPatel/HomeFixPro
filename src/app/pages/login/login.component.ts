import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { PagesService } from 'src/app/service/pages.service';
import { UserService } from 'src/app/service/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  userId: any;
  show_button: Boolean = false;
  show_eye: Boolean = false;
  constructor(private page: PagesService,
    private router: Router,
    private toastr: ToastrService, private spinner: NgxSpinnerService, private userService: UserService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  get f() { return this.loginForm.controls; }

  loginSubmit() {
    this.submitted = true;
    this.spinner.show();
    if (this.loginForm.invalid) {
      return;
    } else {
      let obj = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      }
      this.userService.userLogin(obj).subscribe((res: any) => {
        if (res.status) {
          this.submitted = false;
          this.userId = res.response_data.id;
          localStorage.setItem("token", res.api_token);
          localStorage.setItem("userId", res.response_data.id);
          localStorage.setItem("roleId", res.response_data.role_id);
          localStorage.setItem("fName", res.response_data.fname);
          localStorage.setItem("lName", res.response_data.lname);
          this.userService.storeUserData(res);
          this.loginForm.reset();
          this.router.navigate(['/user-profile']);
          this.toastr.success(res.message);
        } else if (res) {
          this.toastr.error(res.message);
        }
      }, err => {
        this.spinner.hide();
        console.log(err);
      });
    }
  }

  showPassword() {
    this.show_button = !this.show_button;
    this.show_eye = !this.show_eye;
  }
}
