import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/service/user.service';
import { MustMatch } from 'src/app/_helpers/must-match.validator';
import { CustomValidatos } from 'src/app/_helpers/custom-validator';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  changePassForm: FormGroup;
  profileSecOne: FormGroup;
  changePassSubmitted = false;

  constructor(private userService: UserService,
    private router: Router,
    private toastr: ToastrService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    if (localStorage.getItem("token") == null) {
      this.router.navigate(['/login']);
    }
    this.profileSecOne = this.formBuilder.group({
      fname: ['', [Validators.required]],
      lname: ['', [Validators.required]],
      email: ['', [Validators.required]]
    });

    this.changePassForm = this.formBuilder.group({
      old_password: ['', [Validators.required, Validators.email]],
      password: [null, Validators.compose([
        Validators.required,
        CustomValidatos.patternValidator(/\d/, { hasNumber: true }),
        CustomValidatos.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
        CustomValidatos.patternValidator(/[a-z]/, { hasSmallCase: true }),
        Validators.minLength(8)])
      ],
      password_confirmation: ['', Validators.compose([Validators.required])],
    }, {
      validator: [MustMatch('password', 'password_confirmation')]
    });

    this.getProfile();
  }

  get f() { return this.changePassForm.controls; }

  profileData: any;
  getProfile() {
    const token = localStorage.getItem("token");
    // const user = { user_id: this.userId };
    this.userService.getProfile(token).subscribe((res: any) => {
      console.log(res);
      if (res.status) {
        this.profileData = res.response_data;
        if(this.profileData){
          this.profileSecOne.patchValue(this.profileData);
        }
      }
    }, err => {
      console.log(err);
    })
  }

  get g() { return this.profileSecOne.controls; }

  profileSubmitted = false;
  saveProfile(){
    this.profileSubmitted = true;
    // this.loginResponseError = null;
    console.log("loginSubmit", this.profileSecOne);
    if (this.profileSecOne.invalid) {
      return;
    } else {
      const token = localStorage.getItem("token");
      console.log("valid...");
      let obj={
        fname:this.profileSecOne.value.fname,
        lname:this.profileSecOne.value.lname,
        email:this.profileData.email,
        country_id:this.profileData.country_id
      }
      
      this.userService.updateProfile(token, obj).subscribe((res: any) => {
        console.log(res);
        if (res.status) {
          this.toastr.success(res.message);
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

  changePasswordSubmit() {
    this.changePassSubmitted = true;
    console.log("changePassForm", this.changePassForm);
    if (this.changePassForm.invalid) {
      return;
    } else {
      console.log("valid...");
      const token = localStorage.getItem("token");
      // let formData = new FormData();
      let obj = {
        old_password:this.changePassForm.value.old_password,
        password: this.changePassForm.value.password,
        password_confirmation:this.changePassForm.value.password_confirmation
      }

      this.userService.changePassword(token, obj).subscribe((res: any) => {
        console.log(res);
        if (res.status) {
          this.toastr.success(res.message);
          this.changePassSubmitted = false;
          this.changePassForm.reset();
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
}
