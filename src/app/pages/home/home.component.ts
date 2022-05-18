import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PagesService } from 'src/app/service/pages.service';
declare var $;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  token: any;
  searchForm: FormGroup;
  constructor(public page: PagesService,
    private formBuilder: FormBuilder,
    public router: Router,
  ) { }

  ngOnInit(): void {
    this.getHomePage();
    this.token = localStorage.getItem("token");
    this.searchForm = this.formBuilder.group({
      keyword: ['', [Validators.required]],
      zipcode: ['']
    });
  }

  search() {
    console.log(this.searchForm);
    if (this.searchForm.invalid) {
      return;
    } else {
      this.router.navigate(['/search-result'], { queryParams: { keyword: this.searchForm.value.keyword, zipcode: this.searchForm.value.zipcode } })
    }
  }

  jsInit() {
    /*---------------------
 tesimonila
 --------------------- */
    $('.tesimonial').slick({
      infinite: true,
      autoplay: true,
      dots: true,
      arrows: false,
      speed: 1500,
      slidesToShow: 1,
      pauseOnHover: false
    });
  }

  pageExtraData: any = [];
  homePageData: any;
  image_path: any;
  getHomePage() {
    let self = this;
    this.page.getPage('home').subscribe((res: any) => {
      console.log(res);
      if (res.status) {
        this.homePageData = res;
        // this.pageExtraData = res.extra_data;
        this.image_path = res.image_path;
        setTimeout(() => {
          self.serviceSlider();
          self.jsInit();
        }, 100);
      }
    }, err => {
      console.log(err);
    });
  }

  serviceSlider() {
    /*---------------------
 service slide
 --------------------- */
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


    let index = 0;

    let img = $('.home-slider .slider-slide'); // Get the images to be cycled.

    setInterval(function () {
      // Get the next index.  If at end, restart to the beginning.
      index = index + 1 < img.length ? index + 1 : 0;

      // Show the next
      img.eq(index).addClass('show');

      // Hide the previous
      img.eq(index - 1).removeClass('show');
    }, 5000);

  }

  showmore = true;
  showMore() {
    this.showmore = false;
    this.showless = true;
  }

  showless = false;
  showLess() {
    this.showmore = true;
    this.showless = false;
  }

}
