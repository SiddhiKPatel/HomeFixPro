import { Component, OnInit } from '@angular/core';
import { PagesService } from 'src/app/service/pages.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  blogList: any = [];
  image_path: any = '';
  constructor(public page: PagesService) { }

  ngOnInit(): void {
    this.getBlogList();
  }

  getBlogList() {
    this.page.getPage('blog').subscribe((res: any) => {
      console.log(res);
      if (res.blogs) {
        this.blogList = res.blogs;
        this.image_path = res.image_path;
      } else {
        this.blogList = [];
      }
    }, err => {
      console.log(err);
    })
  }

}
