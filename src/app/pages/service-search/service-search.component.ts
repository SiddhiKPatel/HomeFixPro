import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PagesService } from 'src/app/service/pages.service';

@Component({
  selector: 'app-service-search',
  templateUrl: './service-search.component.html',
  styleUrls: ['./service-search.component.css']
})
export class ServiceSearchComponent implements OnInit {
  category: any;

  constructor(private route: ActivatedRoute, 
    private router: Router,
    public pageService: PagesService) { }

  ngOnInit(): void {
    if (localStorage.getItem("token") == null) {
      this.router.navigate(['/login']);
    }
    this.route.queryParams
      .subscribe(params => {
        this.category = params.category;
        if (this.category) {
          this.getServices(this.category);
        }
      });
  }

  //   "Filter Data
  // category_id = category ID
  // s = Search service title / category name / Tag name from keyword"
  serviceList: any = [];
  image_path: any;
  getServices(category) {
    let formData = new FormData();
    formData.append('s', category);

    this.pageService.getServices(formData).subscribe((res: any) => {
      if (res.status) {
        this.serviceList = res.response_data;
        this.image_path = res.image_path;
      }
    }, err => {
      console.log(err);
    });
  }
}
