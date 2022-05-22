import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { PagesService } from 'src/app/service/pages.service';
declare var $;

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {
  servicesList: any = [];
  image_path: any;

  constructor(private pageService : PagesService,
    private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem("token") == null) {
      this.router.navigate(['/login']);
    }
    this.getServices().then(()=>{
      this.getPage();
    });
  }

  explorePageData: any;
  getPage(){
    let self = this;
    this.pageService.getPage('explore').subscribe((res: any) => {
      console.log(res);
      if (res.status) {
        this.explorePageData = res;
        this.image_path = res.image_path;
      }
    }, err => {
      console.log(err);
    });
  }

  async sliderLoad(){
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

  async getServices(){
    this.pageService.getServices({}).subscribe((res: any)=>{
      console.log(res);
      if(res.status && res.response_data){
        this.servicesList = res.response_data.data;
        this.image_path = res.image_path ? res.image_path : '';
      }
      setTimeout(() => {
        this.sliderLoad();
      }, 200);
    }, err=>{
      console.log(err);
    })
  }

}
