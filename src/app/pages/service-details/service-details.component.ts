import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PagesService } from 'src/app/service/pages.service';
declare var $;

@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.component.html',
  styleUrls: ['./service-details.component.css']
})
export class ServiceDetailsComponent implements OnInit {
  servicesList: any = [];
  image_path: any;
  slug: any;

  constructor(private pageService: PagesService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((parameter: any) => {
      console.log(parameter);
      if (parameter.slug) {
        this.slug = parameter.slug;
        if (this.slug) {
          this.getCategoryDetails(this.slug);
        }
      }
    });

    // this.getServices().then(() => {
    //   // this.getPage();
    // });
  }

  explorePageData: any;
  serviceCatDetails: any;
  getCategoryDetails(slug) {
    let formData = new FormData();
    formData.set("slug", slug);
    this.pageService.getServiceCategoryDetails(formData).subscribe((res: any) => {
      console.log(res);
      if (res.status) {
        // this.explorePageData = res;
        if (res.response_data) {
          this.serviceCatDetails = res.response_data;
          setTimeout(() => {
            this.sliderLoad();
          }, 200);
        }
        this.image_path = res.image_path;
      }
    }, err => {
      console.log(err);
    });
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

    $('.homefix-service-slider').slick({
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

  // async getServices() {
  //   this.pageService.getServices({}).subscribe((res: any) => {
  //     console.log(res);
  //     if (res.status && res.response_data) {
  //       this.servicesList = res.response_data.data;
  //       this.image_path = res.image_path ? res.image_path : '';
  //     }
  //     setTimeout(() => {
  //       this.sliderLoad();
  //     }, 200);
  //   }, err => {
  //     console.log(err);
  //   })
  // }


}
