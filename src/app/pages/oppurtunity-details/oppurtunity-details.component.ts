import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PagesService } from 'src/app/service/pages.service';

@Component({
  selector: 'app-oppurtunity-details',
  templateUrl: './oppurtunity-details.component.html',
  styleUrls: ['./oppurtunity-details.component.css']
})
export class OppurtunityDetailsComponent implements OnInit {
  slug: any;
  jobDetails: any;
  image_path: any;

  constructor(private _location: Location, 
    private route: ActivatedRoute, 
    private router: Router,
    private pageService: PagesService) { }

  ngOnInit(): void {
    if (localStorage.getItem("token") == null) {
      this.router.navigate(['/login']);
    }
    this.slug = this.route.snapshot.paramMap.get('slug');
    console.log(this.slug);
    if (this.slug) {
      this.getjobDetails(this.slug);
    }
  }

  getjobDetails(slug){
    const token = localStorage.getItem("token");
    let formData = new FormData();
    formData.set('slug', slug);
    this.pageService.getJobDetails(token, formData).subscribe((res: any) => {
      console.log(res);
      if(res.status && res.response_data){
        this.jobDetails = res.response_data;
        this.image_path = res.image_path ? res.image_path : '';
      }
    }, err => {
      console.log(err);
    })
  }

}
