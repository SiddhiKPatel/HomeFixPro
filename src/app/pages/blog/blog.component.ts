import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PagesService } from 'src/app/service/pages.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  blogList: any = [];
  image_path: any = '';
  constructor(public page: PagesService, private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem("token") == null) {
      this.router.navigate(['/login']);
    }
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
