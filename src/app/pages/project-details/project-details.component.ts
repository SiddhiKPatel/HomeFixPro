import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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

  constructor(private _location: Location,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private pageService: PagesService) { }

  ngOnInit(): void {
    this.slug = this.route.snapshot.paramMap.get('slug');
    console.log(this.slug);
    if (this.slug) {
      this.getServiceDetails(this.slug).then(() => { this.sliderLoad(); })
    }
    this.contactForm = this.formBuilder.group({
      zip_code: [''],
      // frequency: ['', [Validators.required]],
      // title: ['', [Validators.required]],
      delivery_time_id: [''],
      amount: ['', [Validators.required]],
      contract_estimate_end: ['', [Validators.required]]
    });
    this.searchForm = this.formBuilder.group({
    });
    this.token = localStorage.getItem("token");
  }

  get f() { return this.contactForm.controls; }

  back() {
    this._location.back();
  }

  sendContract() {
    this.submitted = true;
    console.log("registrationSubmit", this.contactForm);
    if (!this.token || !this.serviceDetails) {
      this.router.navigate(['/login']);
    }
    if (this.contactForm.invalid) {
      return;
    } else {
      console.log("valid...");

      let formData = new FormData();
      formData.set('service_id', this.serviceDetails.id);
      formData.set('title', this.serviceDetails.title);
      formData.set('zip_code', this.contactForm.value.zip_code);
      formData.set('amount', this.contactForm.value.amount);
      formData.set('contract_estimate_end', this.contactForm.value.contract_estimate_end);

      // formData.set('delivery_time_id', '2');

      this.pageService.createJobRequest(this.token, formData).subscribe((res: any) => {
        console.log(res);
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
    formData.set('slug', this.slug);
    this.pageService.getServiceDetails(formData).subscribe((res: any) => {
      console.log(res);
      if (res.status && res.response_data) {
        this.serviceDetails = res.response_data;
        this.image_path = res.image_path ? res.image_path : '';
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
      this.contactForm.patchValue({"contract_estimate_end":''});
      return false;
    }
    return true;
  }

}
