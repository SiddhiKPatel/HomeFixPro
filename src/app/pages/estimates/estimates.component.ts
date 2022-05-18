import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PagesService } from 'src/app/service/pages.service';

@Component({
  selector: 'app-estimates',
  templateUrl: './estimates.component.html',
  styleUrls: ['./estimates.component.css']
})
export class EstimatesComponent implements OnInit {
  token: any;
  slug: any;
  categoryPageDetails: any;
  image_path: any;
  extra_data: any;

  constructor(private pageService: PagesService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.token = localStorage.getItem("token");;

    this.route.params.subscribe((parameter: any) => {
      console.log(parameter);
      if (parameter.slug) {
        this.slug = parameter.slug;
        if (this.slug) {
          this.getCategoryPageDetails(this.slug);
        }
      }
    });
  }

  getCategoryPageDetails(slug){
    // let formData = new FormData();
    // formData.set("slug", slug);
    this.pageService.getPage(slug).subscribe((res: any) => {
      console.log(res);
      if (res.status) {
        // this.explorePageData = res;
        if(res.extra_data){
          this.extra_data = res.extra_data;
        }
        if (res.response_data) {
          this.categoryPageDetails = res.response_data;
        }
        this.image_path = res.image_path;
      }
    }, err => {
      console.log(err);
    });
  }

}
