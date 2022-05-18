import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PagesService } from 'src/app/service/pages.service';

@Component({
  selector: 'app-submit-proposal',
  templateUrl: './submit-proposal.component.html',
  styleUrls: ['./submit-proposal.component.css']
})
export class SubmitProposalComponent implements OnInit {
  slug: any;
  addProposalPageData: any;
  image_path: any;
  proposalForm: FormGroup;
  deliveryTime: any = [];
  submitted = false;

  constructor(private _location: Location,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private pageService: PagesService) { }

  ngOnInit(): void {
    this.slug = this.route.snapshot.paramMap.get('slug');
    console.log(this.slug);
    if (this.slug) {
      // this.getaddProposalPageData(this.slug);
    }

    this.addProposalPage();

    this.proposalForm = this.formBuilder.group({
      body: ['', [Validators.required]],
      cost: ['', [Validators.required]],
      delivery_time_id: ['', [Validators.required]],
      service_id: ['', [Validators.required]]
    });
  }


  get f() { return this.proposalForm.controls; }

  services: any = [];
  addProposalPage() {
    const token = localStorage.getItem("token");
    let formData = new FormData();
    // formData.set('slug', slug);
    this.pageService.addProposalPage(token, formData).subscribe((res: any) => {
      console.log(res);
      if (res.status && res.response_data) {
        this.addProposalPageData = res.response_data;
        this.services = res.services;
        this.image_path = res.image_path ? res.image_path : '';
        this.deliveryTime = res.delivery_times ? res.delivery_times : [];
      }
    }, err => {
      console.log(err);
    })
  }

  sendProposals() {
    this.submitted = true;

    console.log("registrationSubmit", this.proposalForm);

    if (this.proposalForm.invalid) {
      return;
    } else {
      console.log("valid...");
      const token = localStorage.getItem("token");
      let formData = new FormData();

      formData.set('job_slug', this.slug);
      formData.set('service_id', this.proposalForm.value.service_id);

      formData.set('id', '0');
      formData.set('body', this.proposalForm.value.body);
      formData.set('amount', this.proposalForm.value.cost);
      formData.set('delivery_time_id', this.proposalForm.value.delivery_time_id);

      if (this.imageLoaded) {
        formData.set('file', this.image);
      }


      this.pageService.addUpdateProposal(token, formData).subscribe((res: any) => {
        console.log(res);
        if (res.status) {
          // this.registerResponse = res;
          this.toastr.success(res.message);
          this.submitted = false;
          this.imageLoaded = false;
          this.proposalForm.reset();
        } else {
          // this.registerResponseError = res;
          this.toastr.success(res.message ? res.message : 'server error');
        }
      }, err => {
        this.toastr.success('Server error');
        console.log(err);
      })

    }
  }

  image: any;
  imageLoaded: any;
  importFile(event) {
    if (event.target.files && event.target.files.length > 0) {
      let files = event.target.files || event.dataTransfer.files;
      if (!files.length)
        return;
      var fileName = files[0].name.toUpperCase();
      console.log(fileName.endsWith);
      if (fileName.endsWith(".JPG") || fileName.endsWith(".JPEG") || fileName.endsWith(".PNG")) {
        this.image = files[0];
        this.imageLoaded = true;
      } else {
        this.image = null;
        this.toastr.error("Please select a valid image file jpeg/jpg/png");
      }
    }

  }
  serviceChoose(s){
    console.log(s);
    this.proposalForm.patchValue({"service_id": s.id});
  }
}
