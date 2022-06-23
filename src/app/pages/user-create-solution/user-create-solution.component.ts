import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ActivatedRoute, Router } from '@angular/router';
declare var $;

@Component({
  selector: 'app-user-create-solution',
  templateUrl: './user-create-solution.component.html',
  styleUrls: ['./user-create-solution.component.css']
})
export class UserCreateSolutionComponent implements OnInit {
  currentGfgStep: any; nextGfgStep: any; previousGfgStep: any;
  opacity: any;
  current = 1;
  createServiceForm: FormGroup;
  overViewForm: FormGroup;
  imgForm: FormGroup;
  descForm: FormGroup;
  gallery: FormGroup;
  faqForm: FormGroup;
  submitted = false;
  serviceData: any;
  image: any;
  imageLoaded = false;
  tags: any = [];
  selectedTags: any = [];
  slug: any;
  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' }
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['bold', 'italic'],
      ['fontSize']
    ]
  };
  serviceListData: any;
  editProjectdata: any;
  projectId: any;

  constructor(private toastr: ToastrService,
    private router: Router,
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,) { }

  ngOnInit(): void {
    if (localStorage.getItem("token") == null) {
      this.router.navigate(['/login']);
    }
    this.getServiceList();
    let self = this;
    $(".next-step").click(function () {
      self.currentGfgStep = $(this).parent();
      self.nextGfgStep = $(this).parent().next();

      $("#progressbar li").eq($("fieldset")
        .index(self.nextGfgStep)).addClass("active");

      self.nextGfgStep.show();
      self.currentGfgStep.animate({ opacity: 0 }, {
        step: function (now) {
          self.opacity = 1 - now;

          self.currentGfgStep.css({
            'display': 'none',
            'position': 'relative'
          });
          self.nextGfgStep.css({ 'opacity': self.opacity });
        },
        duration: 500
      });
      // self.setProgressBar(++self.current);
    });

    $(".previous-step").click(function () {

      self.currentGfgStep = $(this).parent();
      self.previousGfgStep = $(this).parent().prev();

      $("#progressbar li").eq($("fieldset")
        .index(self.currentGfgStep)).removeClass("active");

      self.previousGfgStep.show();

      self.currentGfgStep.animate({ opacity: 0 }, {
        step: function (now) {
          self.opacity = 1 - now;

          self.currentGfgStep.css({
            'display': 'none',
            'position': 'relative'
          });
          self.previousGfgStep.css({ 'opacity': self.opacity });
        },
        duration: 500
      });
      // self.setProgressBar(--self.current);
    });


    this.overViewForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      category_id: ['', [Validators.required]],
      selectedTags: [[], [Validators.required]]
      // tag_id: ['', [Validators.required]]
    });

    this.descForm = this.formBuilder.group({
      body: ['', [Validators.required]],
      // faq: ['', [Validators.required]],
    });

    this.imgForm = this.formBuilder.group({
      file: ['', [Validators.required]],
      fileSource: ['', [Validators.required]]
      // faq: ['', [Validators.required]],
    });

    this.faqForm = this.formBuilder.group({
      question: ['', [Validators.required]],
      answer: ['', [Validators.required]]
    });
    this.slug = this.route.snapshot.paramMap.get('slug');
    this.getServices();
  }

  async getServiceList() {
    const token = localStorage.getItem("token");
    this.apiService.serviceList(token).subscribe((res: any) => {
      if (res.status) {
        this.serviceListData = res;
        if (this.slug) {
          this.editProjectdata = this.serviceListData.response_data.filter(x => x.slug == this.slug)[0];
          this.bindFormData();
        }
      }
    }, err => {
      console.log(err);
    })
  }
  bindFormData() {
    this.projectId = this.editProjectdata.id
    this.overViewForm.patchValue({
      title: this.editProjectdata.title,
      category_id: this.editProjectdata.category_id,
      selectedTags: this.editProjectdata.tag
    })
    this.descForm.patchValue({
      body: this.editProjectdata.body
    });

    this.faqForm.patchValue({
      question: this.editProjectdata.faq,
      answer: ''
    });
    this.imgForm.patchValue({
      file: this.editProjectdata.gallery,
      fileSource: this.editProjectdata.image2
    });
  }
  images: any = [];
  galleryimages: any = [];
  onFileChange(event) {
    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader();
        this.galleryimages.push(event.target.files[i]);
        reader.onload = (event: any) => {
          this.images.push(event.target.result);

          this.imgForm.patchValue({
            fileSource: this.images
          });
        }

        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }

  categories: any = [];
  getServices() {
    const token = localStorage.getItem("token");
    this.apiService.getService(token, {}).subscribe((res: any) => {
      if (res.status) {
        this.serviceData = res;
        this.tags = res.tags;
        this.categories = res.categories;
      } else if (res.message) {
        this.toastr.error(res.message);
      } else {
        this.toastr.error("Server error!! please try again later.");
      }
    }, err => {
      console.log(err);
      this.toastr.error(err.error.message);
    })
  }
  get f() { return this.overViewForm.controls; }
  get g() { return this.descForm.controls; }

  addService() {
    this.submitted = true;
    if (this.overViewForm.invalid) {
      return;
    } else {
      const token = localStorage.getItem("token");
      const galleryimage: any = []
      for (let k = 0; k < this.galleryimages.length; k++) {
        galleryimage.push(this.galleryimages[k])
      }
      let question: any = []
      for (let i = 0; i < this.question.length; i++) {
        question.push(this.question[i]);
      }
      let answer: any = []
      for (let j = 0; j < this.answer.length; j++) {
        answer.push(this.answer[j]);
      }
      let tags: any = [];
      for (let i = 0; i < this.overViewForm.value.selectedTags.length; i++) {
        tags.push(this.overViewForm.value.selectedTags[i].id);
      }
      let formData = new FormData;
      formData.append('galleryimage[]', this.galleryimages[0]);
      formData.append('question', question);
      formData.append('answer', answer);
      formData.append('tag_id', tags);
      formData.append('id', this.projectId ? this.projectId : '0');
      formData.append('title', this.overViewForm.value.title);
      formData.append('category_id', this.overViewForm.value.category_id);
      formData.append('status', '1');
      formData.append('body', this.descForm.value.body);

      this.apiService.addUpdateService(token, formData).subscribe((res: any) => {
        if (res.status) {
          this.toastr.success(res.message);
          document.getElementById("next-step").click();
        } else if (res.message) {
          this.toastr.error(res.message);
        } else {
          this.toastr.error("Server error!! please try again later.");
        }
      }, err => {
        console.log(err);
        this.toastr.error(err.error.message);
      });
    }
  }


  get fq() { return this.faqForm.controls; }
  submittedFaq = false;
  question: any = [];
  answer: any = [];
  close() {
    this.faqForm.reset();
  }
  faqAdd() {
    this.submittedFaq = true;
    if (this.faqForm.invalid) {
      return;
    } else {
      this.question.push(this.faqForm.value.question);
      this.answer.push(this.faqForm.value.answer);
      this.submittedFaq = false;
      this.faqForm.reset();
      document.getElementById("closeModalButton").click();
    }

  }



}
