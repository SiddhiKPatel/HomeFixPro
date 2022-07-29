import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api.service';
import { PagesService } from 'src/app/service/pages.service';
declare var $;

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {
  slug: string
  serviceDetails: any;
  image_path: any;
  contactForm: FormGroup;
  searchForm: FormGroup;
  submitted = false;
  token: any;
  form: any;
  userRating: any;
  userId: string;

  constructor(private _location: Location,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private pageService: PagesService,
    private api: ApiService) { }

  ngOnInit(): void {
    if (localStorage.getItem("token") == null) {
      this.router.navigate(['/login']);
    }
    this.userId = localStorage.getItem("userId");
    this.slug = this.route.snapshot.paramMap.get('slug');
    if (this.slug) {
      this.getServiceDetails(this.slug).then(() => { this.sliderLoad(); })
    }
    this.contactForm = this.formBuilder.group({
      zip_code: ['', [Validators.pattern("[0-9]{6}")]],
      // frequency: ['', [Validators.required]],
      // title: ['', [Validators.required]],
      delivery_time_id: [''],
      amount: ['', [Validators.required]],
      contract_estimate_end: ['', [Validators.required]]
    });
    this.searchForm = this.formBuilder.group({
    });
    this.token = localStorage.getItem("token");

    this.form = this.formBuilder.group({
      rating: ['', Validators.required],
      review: ['']
    });
  }

  get f() { return this.contactForm.controls; }

  back() {
    this._location.back();
  }

  sendContract() {
    this.submitted = true;
    if (!this.token || !this.serviceDetails) {
      this.router.navigate(['/login']);
    }
    if (this.contactForm.invalid) {
      return;
    } else {
      let obj = {
        service_id: this.serviceDetails.id,
        title: this.serviceDetails.title,
        zip_code: this.contactForm.value.zip_code,
        amount: this.contactForm.value.amount,
        contract_estimate_end: this.contactForm.value.contract_estimate_end
      }

      this.pageService.createJobRequest(this.token, obj).subscribe((res: any) => {
        if (res.status) {
          this.toastr.success(res.message ? res.message : '');
          this.contactForm.reset();
          this.submitted = false;
          this.router.navigate(['/inbox']);
        } else {
          this.toastr.success(res.message ? res.message : 'Server error! please try again later.');
        }
      }, err => {
        console.log(err);
      });
    }
  }

  async sliderLoad() {
    $('.service-slider').slick({
      infinite: true,
      autoplay: true,
      dots: false,
      arrows: true,
      speed: 1000,
      slidesToShow: 3,
      pauseOnHover: false,
      responsive: [{
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
      ]
    });
  }

  async getServiceDetails(slug) {
    let formData = new FormData();
    formData.append('slug', this.slug);
    this.pageService.getServiceDetails(formData).subscribe((res: any) => {
      if (res.status && res.response_data) {
        this.serviceDetails = res.response_data;
        this.image_path = res.image_path ? res.image_path : '';
        this.getRating();
      }
    }, err => {
      console.log(err);
    })

  }

  tDate() {
    var UserDate = this.contactForm.value.contract_estimate_end;
    var ToDate = new Date();
    if (new Date(UserDate).getTime() <= ToDate.getTime()) {
      this.toastr.error("The Date must be Bigger or Equal to today date");
      this.contactForm.patchValue({ "contract_estimate_end": '' });
      return false;
    }
    return true;
  }

  saveRate() {
    let obj = {
      project_id: this.serviceDetails.id,
      user_id: this.serviceDetails.user_id,
      rating: this.form.value.rating,
      review: this.form.value.review,
      given_user_id: this.userId
    }
    this.api.addReview(this.token, obj).subscribe((res: any) => {
      if (res.status) {
        this.toastr.success(res.message ? res.message : '');
        this.form.reset();
      }
    }, err => {
      console.log(err);
    })
  }
  getRating() {
    let obj = { user_id: this.serviceDetails.user_id }
    this.api.getRating(this.token, obj).subscribe((res: any) => {
      this.userRating = res.response_data.user_rating;
      console.log(this.userRating)
    }, err => {
      console.log(err);
    })
  }
}
