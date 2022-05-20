import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PagesService } from 'src/app/service/pages.service';
import { CustomValidator } from 'src/app/custom-validator';
import { MustMatch } from '../../_helpers/must-match.validator';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  registerPageData: any;
  registerForm: FormGroup;
  registerFormStep1: FormGroup;
  submitted = false;
  role_id: any = 3;
  registerResponse: any;
  registerResponseError: any;
  show_button: Boolean = false;
  show_eye: Boolean = false;
  constructor(private page: PagesService, 
    private apiService:  ApiService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.registerFormStep1 = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });

    this.registerForm = this.formBuilder.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      
      password: ['', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z]).{8,}$')]],
      // password_confirmation: ['', Validators.compose([Validators.required, CustomValidator.equalTo('password')])],
      // phone_number: ['', Validators.required],
      country_id: ['', Validators.required],
      state_id: ['', Validators.required],
      city: ['', Validators.required],
      zip_code: ['', Validators.required],
      terms: [false, Validators.requiredTrue]
      // city: ['', Validators.required],
      // zip: ['', Validators.required],
      // dob: ['', Validators.compose([Validators.required, CustomValidator.ageCheck('dob')])],
      // phone_no: ['', Validators.required],
      // event_date: [''],
      // recaptchaReactive: ['', Validators.required],


    },
      // {
      //   validator: [MustMatch('password', 'password_confirmation')]
      // }
    );

    this.getRegisterPage();
  }

  getRegisterPage() {
    this.page.getRegister().subscribe((res: any) => {
      console.log(res);
      if (res.status) {
        this.registerPageData = res;
      }
    }, err => {
      console.log(err);
    })
  }

  selectRole(role) {
    console.log("role", role);
    this.role_id = role.id;
  }

  get f() { return this.registerForm.controls; }
  get g() { return this.registerFormStep1.controls; }

  registrationSubmit() {
    this.submitted = true;
    this.registerResponseError = null;
    console.log("registrationSubmit", this.registerForm);

    if (this.registerForm.invalid) {
      return;
    } else {
      console.log("valid...");
      let obj = {
        fname: this.registerForm.value.fname,
        lname: this.registerForm.value.lname,
        email: this.registerFormStep1.value.email,
        password: this.registerForm.value.password,
        password_confirmation: this.registerForm.value.password,
        country_id: this.registerForm.value.country_id,
        state_id: this.registerForm.value.state_id,
        city: this.registerForm.value.city,
        zip_code: this.registerForm.value.zip_code,
        role_id: this.role_id,
      }
      // let formData = new FormData();
      // formData.set('fname', this.registerForm.value.fname);
      // formData.set('lname', this.registerForm.value.lname);
      // formData.set('email', this.registerFormStep1.value.email);
      // // formData.set('phone_number', '8899889988');
      // formData.set('password', this.registerForm.value.password);
      // formData.set('password_confirmation', this.registerForm.value.password);
      // formData.set('country_id', this.registerForm.value.country_id);
      // formData.set('city', this.registerForm.value.city);
      // formData.set('zip_code', this.registerForm.value.zip_code);
      // formData.set('role_id', this.role_id);

      this.page.register(obj).subscribe((res: any) => {
        console.log(res);
        if(res.status){
          this.registerResponse = res;
        }else{
          this.registerResponseError = res;
        }
      }, err => {
        console.log(err);
      })

    }
  }
  submittedStep1 = false;
  step1success = false;
  registrationStep1Submit(){
    this.submittedStep1 = true;
    console.log(this.registerFormStep1);
    if (this.registerFormStep1.invalid) {
      return;
    }else{
      this.step1success = true;
    } 

  }

  changeCountry(event){
    console.log(event);
    console.log(event.target.value);
    this.registerForm.patchValue({'state_id': ''});

    this.getSateList(event.target.value);
  }

  stateList: any =[];
  getSateList(id){
    this.apiService.getStates(id).subscribe((res: any)=>{
      console.log(res);
      if(res && res.status){
        this.stateList = res.states;
      }
    }, err=>{
      console.log(err);
    })
  }
  showPassword() {
    this.show_button = !this.show_button;
    this.show_eye = !this.show_eye;
  }
}
