import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { WebcamImage } from 'ngx-webcam';
import { PagesService } from 'src/app/service/pages.service';
import { UserService } from 'src/app/service/user.service';
declare var $;
// import { IDropdownSettings, } from 'ng-multiselect-dropdown';


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  userId: any;
  ImageFile: any;
  imageSrc: any;
  profileData: any;
  profileSecOne: FormGroup;
  profileSecTwo: FormGroup;
  profileSecThree: FormGroup;
  profileSecFour: FormGroup;
  submitted = false;
  dropdownList = [];
  roleId: any;
  // dropdownSettings:IDropdownSettings={};

  skills: any = [];
  selectedSkills: any = [];
  urlRegEx = /^(?:(http(s)?)?(sftp)?(ftp)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
  displayStyle = "none";
  // selectedSkills = [{ id: 3, name: "Volkswagen Ford" }];

  constructor(private page: PagesService,
    private router: Router,
    private toastr: ToastrService,
    private userService: UserService, private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.roleId = localStorage.getItem("roleId");
    this.profileSecOne = this.formBuilder.group({
      fname: ['', [Validators.required]],
      lname: ['', [Validators.required]],
      occupation: [''],
      country_id: ['', [Validators.required]],
      city: ['', [Validators.required]],
      zip_code: ['', [Validators.required, Validators.pattern("[0-9]{6}")]],
    });

    this.profileSecTwo = this.formBuilder.group({
      description: ['']
    });

    this.profileSecThree = this.formBuilder.group({
      facebook_url: ['', [Validators.pattern(this.urlRegEx)]],
      instagram_url: ['', [Validators.pattern(this.urlRegEx)]],
      twitter_url: ['', [Validators.pattern(this.urlRegEx)]],
      linkedin_url: ['', [Validators.pattern(this.urlRegEx)]],
    });

    $(".editProfileBox .list-group a").on("click", function (event) {
      var $anchor = $(this);
      $("html, body")
        .stop()
        .animate(
          {
            scrollTop: $($anchor.attr("href")).offset().top - 160,
          },
          10
        );
      event.preventDefault();
    });

    $(".editProfileBox .list-group a").on("click", function () {
      $(".editProfileBox .list-group a").removeClass("active");
      $(this).addClass("active");
    });

    this.getProfile();
    this.userId = localStorage.getItem("userId");
  }

  get f() { return this.profileSecOne.controls; }
  get f1() { return this.profileSecThree.controls; }

  countries: any = [];
  image_path: any;
  getProfile() {
    const token = localStorage.getItem("token");
    this.spinner.show();
    this.userService.getProfile(token).subscribe((res: any) => {
      if (res.status) {
        this.countries = res.countries;
        this.image_path = res.image_path;
        this.profileData = res.response_data;
        this.skills = res.skills;
        this.selectedSkills = res.response_data.skill;
        if (this.profileData && this.countries) {
          this.profileSecOne.patchValue(this.profileData);
          this.profileSecTwo.patchValue(this.profileData);
          this.profileSecThree.patchValue(this.profileData);
        }
        this.spinner.hide();
      }
    }, err => {
      console.log(err);
    })
  }

  async onFileChange(event: any) {
    this.displayStyle = 'none';
    this.spinner.show();
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      const newFiles = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = (event: any) => {
        this.ImageFile = event.target.result;
        this.imageSrc = reader.result as string;
      };
      const token = localStorage.getItem("token");
      let formData = new FormData;
      formData.append('user_id', this.userId);
      formData.append('avatar', newFiles);
      await this.userService.profileImageUpdate(token, formData).subscribe((res: any) => {
        if (res.status) {
          this.toastr.success(res.message);
          // this.getProfile();
          this.profileData.avatar_url = res.response_data.avatar_url;
        } else if (res.message) {
          this.toastr.error(res.message);
        } else {
          this.toastr.error("Server error!! please try again later.");
        }
        this.spinner.hide();
      }, err => {
        console.log(err);
        this.toastr.error(err.error.message);
      })
    }
  }

  updateProfile() {
    this.submitted = true;
    if (this.profileSecOne.invalid || this.profileSecThree.invalid) {
      return;
    } else {
      this.spinner.show();
      let skills: any = [];
      for (let i = 0; i < this.selectedSkills.length; i++) {
        skills.push(this.selectedSkills[i].id);
      }

      let obj = {
        fname: this.profileSecOne.value.fname,
        lname: this.profileSecOne.value.lname,
        occupation: this.profileSecOne.value.occupation ? this.profileSecOne.value.occupation : "",
        email: this.profileData.email,
        country_id: this.profileSecOne.value.country_id,
        city: this.profileSecOne.value.city,
        zip_code: this.profileSecOne.value.zip_code,
        description: this.profileSecTwo.value.description ? this.profileSecTwo.value.description : "",
        facebook_url: this.profileSecThree.value.facebook_url ? this.profileSecThree.value.facebook_url : "",
        instagram_url: this.profileSecThree.value.instagram_url ? this.profileSecThree.value.instagram_url : "",
        twitter_url: this.profileSecThree.value.twitter_url ? this.profileSecThree.value.twitter_url : "",
        linkedin_url: this.profileSecThree.value.linkedin_url ? this.profileSecThree.value.linkedin_url : "",
        skill_id: skills,
      }
      const token = localStorage.getItem("token");
      this.userService.updateProfile(token, obj).subscribe((res: any) => {
        if (res.status) {
          this.toastr.success(res.message);
          this.router.navigate(['/user-profile']);
        } else if (res.message) {
          this.toastr.error(res.message);
        } else {
          this.toastr.error("Server error!! please try again later.");
        }
        this.spinner.hide();
      }, err => {
        console.log(err);
        this.toastr.error(err.error.message);
      })

    }
  }
  openPopup() {
    this.displayStyle = "block";
  }
  closePopup() {
    this.displayStyle = "none";
  }

  openCamera(){
    this.router.navigate(['/camera']);
  }
}
