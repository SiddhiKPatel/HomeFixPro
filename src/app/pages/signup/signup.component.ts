import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PagesService } from 'src/app/service/pages.service';
import { CustomValidator } from 'src/app/custom-validator';
import { MustMatch } from '../../_helpers/must-match.validator';
import { ApiService } from 'src/app/service/api.service';
import { NgxSpinnerService } from 'ngx-spinner';

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
  questionList: any;
  category: any = [];
  submittedStep2: boolean;
  step2success: boolean;
  questionForm: FormGroup;
  isCateSelect: boolean = false;
  catequestionList: any = [];
  questions: any = [];
  selectedfile: any[] = [];
  country: any;
  constructor(private page: PagesService,
    private apiService: ApiService,
    private formBuilder: FormBuilder, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.registerFormStep1 = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });

    this.registerForm = this.formBuilder.group({
      fname: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      lname: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      password: ['', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z]).{8,}$')]],
      // password_confirmation: ['', Validators.compose([Validators.required, CustomValidator.equalTo('password')])],
      // phone_number: ['', Validators.required],
      zip_code: ['', [Validators.required, Validators.pattern("[0-9]{6}")]],
      country_id: ['', Validators.required],
      state_id: ['', Validators.required],
      city: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      // city: ['', Validators.required],
      // zip: ['', Validators.required],
      // dob: ['', Validators.compose([Validators.required, CustomValidator.ageCheck('dob')])],
      // phone_no: ['', Validators.required],
      // event_date: [''],
      // recaptchaReactive: ['', Validators.required],
    },
    );

    this.questionForm = this.formBuilder.group({
      question: [''],
      yesno: [''],
      file: [''],
      text: [''],
      terms: [false, Validators.requiredTrue],
      category: ['']
    })
    this.getRegisterPage();
    this.getQuestionList();
  }

  getRegisterPage() {
    this.page.getRegister().subscribe((res: any) => {
      if (res.status) {
        this.registerPageData = res;
        this.country = this.registerPageData.countries.filter(x => x.id == 233);// US
      }
    }, err => {
      console.log(err);
    })
  }

  selectRole(role) {
    this.role_id = role.id;
  }

  get f() { return this.registerForm.controls; }
  get g() { return this.registerFormStep1.controls; }

  registrationSubmit() {
    this.submitted = true;
    this.registerResponseError = null;
    if (this.role_id == 3) {
      if (this.registerForm.invalid) {
        return;
      }
      else {
        this.spinner.show();
        if (this.questionForm.value.yesno != '') {
          let data = this.catequestionList.filter(x => x.type_name == 'Yes/No Answer')
          this.questions.push({
            quesion_id: data[0].id,
            type: data[0].type,
            answer: this.questionForm.value.yesno
          })
        }
        if (this.questionForm.value.file != '') {
          let data = this.catequestionList.filter(x => x.type_name == 'File Upload Answer')
          this.questions.push({
            quesion_id: data[0].id,
            type: data[0].type,
            answer: ""
          })
        }
        if (this.questionForm.value.text != '') {
          let data = this.catequestionList.filter(x => x.type_name == "Text Answer")
          this.questions.push({
            quesion_id: data[0].id,
            type: data[0].type,
            answer: this.questionForm.value.text
          })
        }
        let formData = new FormData;
        formData.append('email', this.registerFormStep1.value.email)
        formData.append('fname', this.registerForm.value.fname)
        formData.append('lname', this.registerForm.value.lname)
        formData.append('password', this.registerForm.value.password)
        formData.append('password_confirmation', this.registerForm.value.password)
        formData.append('country_id', this.registerForm.value.country_id)
        formData.append('state_id', this.registerForm.value.state_id)
        formData.append('city', this.registerForm.value.city)
        formData.append('zip_code', this.registerForm.value.zip_code)
        formData.append('role_id', this.role_id)
        formData.append('question_answer', JSON.stringify(this.questions));
        formData.append('answer_file', this.selectedfile[0])
        this.page.register(formData).subscribe((res: any) => {
          if (res.status) {
            this.registerResponse = res;
          } else {
            this.registerResponseError = res;
          }
          this.spinner.hide();
        }, err => {
          console.log(err);
        })
  
      }
    }
    if (this.role_id == 2) {
      if (this.registerForm.invalid || this.questionForm.invalid) {
        return;
      }
      else {
        this.spinner.show();
        if (this.questionForm.value.yesno != '') {
          let data = this.catequestionList.filter(x => x.type_name == 'Yes/No Answer')
          this.questions.push({
            quesion_id: data[0].id,
            type: data[0].type,
            answer: this.questionForm.value.yesno
          })
        }
        if (this.questionForm.value.file != '') {
          let data = this.catequestionList.filter(x => x.type_name == 'File Upload Answer')
          this.questions.push({
            quesion_id: data[0].id,
            type: data[0].type,
            answer: ""
          })
        }
        if (this.questionForm.value.text != '') {
          let data = this.catequestionList.filter(x => x.type_name == "Text Answer")
          this.questions.push({
            quesion_id: data[0].id,
            type: data[0].type,
            answer: this.questionForm.value.text
          })
        }
        let formData = new FormData;
        formData.append('email', this.registerFormStep1.value.email)
        formData.append('fname', this.registerForm.value.fname)
        formData.append('lname', this.registerForm.value.lname)
        formData.append('password', this.registerForm.value.password)
        formData.append('password_confirmation', this.registerForm.value.password)
        formData.append('country_id', this.registerForm.value.country_id)
        formData.append('state_id', this.registerForm.value.state_id)
        formData.append('city', this.registerForm.value.city)
        formData.append('zip_code', this.registerForm.value.zip_code)
        formData.append('role_id', this.role_id)
        formData.append('question_answer', JSON.stringify(this.questions));
        formData.append('answer_file', this.selectedfile[0])
        this.page.register(formData).subscribe((res: any) => {
          if (res.status) {
            this.registerResponse = res;
          } else {
            this.registerResponseError = res;
          }
          this.spinner.hide();
        }, err => {
          console.log(err);
        })
  
      }
    }
    
  }
  submittedStep1 = false;
  step1success = false;

  registrationStep1Submit() {
    this.submittedStep1 = true;
    if (this.registerFormStep1.invalid) {
      return;
    } else {
      this.step1success = true;
    }
  }

  next() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    } else {
      this.step2success = true;
      this.submittedStep2 = true;
    }
  }
  onFileChange(event) {
    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader();
        this.selectedfile.push(event.target.files[i]);
        reader.onload = (event: any) => {
        }
        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }


  changeCountry(event) {
    this.registerForm.patchValue({ 'state_id': '' });
    this.getSateList(event.target.value);
  }
  changeCate(event) {
    this.catequestionList = this.questionList.filter(x => x.category_id == parseInt(event.target.value))
    this.isCateSelect = true;
  }

  stateList: any = [];
  getSateList(id) {
    this.apiService.getStates(id).subscribe((res: any) => {
      if (res && res.status) {
        this.stateList = res.states;
      }
    }, err => {
      console.log(err);
    })
  }

  showPassword() {
    this.show_button = !this.show_button;
    this.show_eye = !this.show_eye;
  }

  getQuestionList() {
    this.apiService.getQuestionList().subscribe((res: any) => {
      this.questionList = res.response_data
      this.category = res.category
    });
  }
}
