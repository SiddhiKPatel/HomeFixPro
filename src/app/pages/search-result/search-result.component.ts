import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PagesService } from 'src/app/service/pages.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {
  category: any;
  categoryList; any = [];
  zipcode: any = '';
  constructor(private route: ActivatedRoute, public pageService: PagesService) { }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        console.log(params); 
        this.category = params.keyword;
        this.zipcode = params.zipcode ? params.zipcode : '';
        console.log(this.category); 
        if (this.category) {
          if(this.category == 'all'){
            this.getServices('', '');
          }else{
            this.getServices(this.category, this.zipcode);
          }
        }
      });

      this.getServiceCategory();
  }

  getServiceCategory(){
    this.pageService.getServiceCategory({}).subscribe((res: any)=>{
      console.log(res);
      if(res && res.response_data){
        this.categoryList = res.response_data.data;
      }
    }, err=>{
      console.log(err);
    });
  }

  //   "Filter Data
  // category_id = category ID
  // s = Search service title / category name / Tag name from keyword"
  serviceList: any = [];
  image_path: any;
  getServices(category, zipcode) {
    let formData = new FormData();
    formData.set('s', category);
    formData.set('zipcode', zipcode);

    this.pageService.getServices(formData).subscribe((res: any) => {
      console.log(res);
      if (res.status) {
        this.serviceList = res.response_data;
        this.image_path = res.image_path;
      }
    }, err => {
      console.log(err);
    });
  }

}
