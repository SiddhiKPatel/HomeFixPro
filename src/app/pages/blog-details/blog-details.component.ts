import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api.service';
import { PagesService } from 'src/app/service/pages.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css']
})
export class BlogDetailsComponent implements OnInit {
  slug: string
  blogDetails: any;
  image_path: any;
  categoryList: any = [];
  recent_blogs: any = [];
  token: any = '';
  postCommentForm: FormGroup;
  responseData: any;

  constructor(private _location: Location,
    private route: ActivatedRoute,
    private router:Router,
    private apiService: ApiService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private pageService: PagesService) { }

  ngOnInit(): void {
    if (localStorage.getItem("token") == null) {
      this.router.navigate(['/login']);
    }
    // this.slug = this.route.snapshot.paramMap.get('slug');
    // console.log(this.slug);
    // if (this.slug) {
    //   this.getBlogDetails(this.slug);
    // }

    this.postCommentForm = this.formBuilder.group({
      comment_text: ['', [Validators.required]]
    });

    this.route.params.subscribe((parameter: any) => {
      if (parameter.slug) {
        this.slug = parameter.slug;
        if (this.slug) {
          this.getBlogDetails(this.slug);
        }
      }

      // this.parameterValue = parameter.parameter
      // this._router.navigate(['first/4'])
      // this.parameterValue = parameter.parameter
    })

    this.getProfile();
  }

  scrollTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  back() {
    this._location.back();
  }

  getBlogDetails(slug) {
    let formData = new FormData();
    formData.set('slug', this.slug);
    this.pageService.getBlogDetails(formData).subscribe((res: any) => {
      if (res.status && res.response_data) {
        this.scrollTop();
        this.responseData = res;
        this.categoryList = res.category ? res.category : [];
        this.blogDetails = res.response_data;
        this.image_path = res.image_path ? res.image_path : '';
        this.recent_blogs = res.recent_blogs ? res.recent_blogs : [];
      }
    }, err => {
      console.log(err);
    })
  }

  profileData: any;
  getProfile() {
    this.token = localStorage.getItem("token");
    if (this.token) {
      this.userService.getProfile(this.token).subscribe((res: any) => {
        if (res.status) {
          this.profileData = res.response_data;
        }
      }, err => {
        console.log(err);
      });
    }
  }

  postComment() {
    if (this.postCommentForm.invalid) {
      return;
    } else {
      this.token = localStorage.getItem("token");
      let formData = new FormData();
      formData.set("user_id", this.profileData.id);
      formData.set("blog_id", this.blogDetails.id);
      formData.set("name", this.profileData.name);
      formData.set("email", this.profileData.email);
      formData.set("body", this.postCommentForm.value.comment_text);

      this.apiService.postComment(this.token, formData).subscribe((res: any) => {
        if (res && res.status) {
          this.getBlogDetails2();
          this.toastr.success(res.message ? res.message : 'Comment post successfully.');
          this.postCommentForm.reset();
        }
      }, err => {
        console.log(err);
      });
    }
  }

  getBlogDetails2() {
    let formData = new FormData();
    formData.set('slug', this.slug);
    this.pageService.getBlogDetails(formData).subscribe((res: any) => {
      if (res.status && res.response_data) {
        this.responseData = res;
        this.categoryList = res.category ? res.category : [];
        this.blogDetails = res.response_data;
        this.image_path = res.image_path ? res.image_path : '';
        this.recent_blogs = res.recent_blogs ? res.recent_blogs : [];
      }
    }, err => {
      console.log(err);
    })
  }

  getDetails(slug) {
    let formData = new FormData();
    formData.set('slug', slug);
    this.pageService.getBlogDetails(formData).subscribe((res: any) => {
      if (res.status && res.response_data) {
        this.scrollTop();
        this.responseData = res;
        this.categoryList = res.category ? res.category : [];
        this.blogDetails = res.response_data;
        this.image_path = res.image_path ? res.image_path : '';
        this.recent_blogs = res.recent_blogs ? res.recent_blogs : [];
      }
    }, err => {
      console.log(err);
    })
  }

}
