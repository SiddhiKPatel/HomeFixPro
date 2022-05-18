import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api.service';
import { PagesService } from 'src/app/service/pages.service';
import { UserService } from 'src/app/service/user.service';
// import { Observable } from 'rxjs/Observable';
declare var $;

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {
  userId: any;
  token: any;
  usersList: any = [];
  current_user: any;
  @ViewChild('scrollMe') public myScrollContainer: ElementRef;
  submitted = false;
  all_user_unread_message: any;
  image_path: any;

  constructor(private page: PagesService,
    private toastr: ToastrService,
    private apiService: ApiService,
    private userService: UserService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getProfile().then(() => {
      this.getMessageConnections().then(() => {
        this.usersAutoFetch();
      })
    })
    this.userId = localStorage.getItem("userId");
    this.proposalForm = this.formBuilder.group({
      body: ['', [Validators.required]],
      cost: ['', [Validators.required]],
      delivery_time_id: ['', [Validators.required]],
      service_id: ['', [Validators.required]]
    });
  }

  // image_path: any;
  profileData: any;
  async getProfile() {
    this.token = localStorage.getItem("token");
    // this.userService.getProfile(this.token).subscribe((res: any) => {
    //   console.log(res);
    //   if (res.status) {
    //     this.image_path  = res.image_path;
    //     this.profileData = res.response_data;
    //   }
    // }, err => {
    //   console.log(err);
    // })
  }

  async getMessageConnections() {
    let formData = new FormData();
    this.apiService.messages(this.token, formData).subscribe((res: any) => {
      console.log(res);
      if (res) {
        this.usersList = res.users;
        this.current_user = res.current_user;
        this.all_user_unread_message =res.all_user_unread_message;
        this.image_path = res.image_path;
      }
    }, err => {
      console.log(err);
    })
  }

  fetchMessagesDetails: any = [];
  fetchMessagesRes: any;
  oppositeUser: any;
  services: any = [];
  deliveryTime: any = [];
  proposalForm: FormGroup;
  async fetchMessages(user) {
    console.log(user);
    this.oppositeUser = user;
    this.services = user.services ? user.services : [];
    this.deliveryTime = user.delivery_times ? user.delivery_times : [];

    let formData = new FormData();
    formData.set("fetch_id", user.id);
    formData.set("connectionid", user.connection_id);
    this.apiService.fetchMessages(this.token, formData).subscribe((res: any) => {
      console.log(res);
      if (res) {
        this.fetchMessagesRes = res;
        this.fetchMessagesDetails = res.messages ? res.messages : [];
        this.messageAutoFetch();
        this.scrollToBottom();
      }
    }, err => {
      console.log(err);
    })
  }

  messageText: any = '';
  sendMessage() {

    if (this.fetchMessagesRes.can_chat == 0) {
      this.toastr.warning("You can't message at this moment");
      return;
    }
    this.scrollToBottom();
    if (this.messageText) {
      console.log(this.messageText);
      console.log("oppositeUser", this.oppositeUser);
      console.log("currentUser", this.current_user);
      let formData = new FormData();
      formData.set("receiver_id", this.oppositeUser.id);
      formData.set("connection_id", this.oppositeUser.connection_id);
      formData.set("message_type", '3');
      formData.set("message", this.messageText);
      //  formData.set("file_name", );

      this.apiService.postMessage(this.token, formData).subscribe((res: any) => {
        console.log(res);
        if (res && res.status == 200) {
          this.fetchMessages(this.oppositeUser);
          this.messageAutoFetch();
          this.messageText = '';
        }
      }, err => {
        console.log(err);
      });
    }

  }

  fetchAutoInter: any;
  messageAutoFetch() {
    // observable.timer(0,10000)
    // .takeWhile(() => this.alive) // only fires when component is alive
    // .subscribe(() => {
    //   this.appTest.getData().subscribe(data=> {
    //     console.log(data);
    //   })
    // });
    if (this.fetchAutoInter) {
      clearInterval(this.fetchAutoInter);
    }
    let self = this;
    this.fetchAutoInter = setInterval(function () {
      self.fetchMessages(self.oppositeUser);
    }, 10000);
  }

  fetchAutoInterUsers: any;
  usersAutoFetch() {
    // observable.timer(0,10000)
    // .takeWhile(() => this.alive) // only fires when component is alive
    // .subscribe(() => {
    //   this.appTest.getData().subscribe(data=> {
    //     console.log(data);
    //   })
    // });
    if (this.fetchAutoInterUsers) {
      clearInterval(this.fetchAutoInterUsers);
    }
    let self = this;
    this.fetchAutoInterUsers = setInterval(function () {
      self.getMessageConnections();
    }, 13000);
  }

  // alive = true;
  ngOnDestroy() {
    console.log("Destroy");
    // this.alive = false; // switches your IntervalObservable off
    if (this.fetchAutoInter) {
      clearInterval(this.fetchAutoInter);
    }
    if (this.fetchAutoInterUsers) {
      clearInterval(this.fetchAutoInterUsers);
    }
  }

  scrollToBottom(): void {
    try {
      console.log(this.myScrollContainer);
      console.log(this.myScrollContainer.nativeElement.scrollTop);
      console.log(this.myScrollContainer.nativeElement.scrollHeight);
      this.myScrollContainer.nativeElement.scrollTop = 200;
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
      this.myScrollContainer.nativeElement.scroll({
        top: this.myScrollContainer.nativeElement.scrollHeight,
        left: 0,
        behavior: 'smooth'
      });
    } catch (err) {
      console.log(err);
    }
  }

  // sendContract() {

  // }

  sendContract() {
    if (this.fetchMessagesRes.can_chat == 0) {
      this.toastr.warning("You can't send contract at this moment");
      return;
    }
    this.submitted = true;

    console.log("registrationSubmit", this.proposalForm);

    if (this.proposalForm.invalid) {
      return;
    } else {
      console.log("oppositeUser", this.oppositeUser);
      console.log("currentUser", this.current_user);
      let formData = new FormData();
      formData.set("receiver_id", this.oppositeUser.id);
      formData.set("connection_id", this.oppositeUser.connection_id);
      formData.set("message_type", '6');

      // formData.set('job_slug', this.fetchMessagesRes.job.slug);
      formData.set('service_id', this.proposalForm.value.service_id);
      // formData.set('id', '0');
      formData.set('body', this.proposalForm.value.body);
      formData.set('amount', this.proposalForm.value.cost);
      formData.set('delivery_time_id', this.proposalForm.value.delivery_time_id);

      if (this.imageLoaded) {
        formData.set('file', this.image);
      }
      // formData.set("message", this.messageText);
      //  formData.set("file_name", );

      this.apiService.postMessage(this.token, formData).subscribe((res: any) => {
        console.log(res);
        if (res && res.status == 200) {
          this.fetchMessages(this.oppositeUser);
          this.messageAutoFetch();
          this.messageText = '';
          $('#contractModal').modal('hide');
          this.submitted = false;
          this.proposalForm.reset();
        }
      }, err => {
        console.log(err);
      });
    }
  }

  acceptContract(contract_id) {
    console.log("oppositeUser", this.oppositeUser);
    console.log("currentUser", this.current_user);
    let formData = new FormData();
    formData.set("receiver_id", this.oppositeUser.id);
    formData.set("connection_id", this.oppositeUser.connection_id);
    formData.set("message_type", '7');
    formData.set("contract_id", contract_id);
    //  formData.set("file_name", );

    this.apiService.postMessage(this.token, formData).subscribe((res: any) => {
      console.log(res);
      if (res && res.status == 200) {
        this.fetchMessages(this.oppositeUser);
        this.messageAutoFetch();
        this.messageText = '';
      }
    }, err => {
      console.log(err);
    });
  }

  declineChat() {
    console.log("oppositeUser", this.oppositeUser);
    console.log("currentUser", this.current_user);
    let formData = new FormData();
    formData.set("receiver_id", this.oppositeUser.id);
    formData.set("connection_id", this.oppositeUser.connection_id);
    formData.set("message_type", '11');
    formData.set("message", 'Decline the request');
    //  formData.set("file_name", );

    this.apiService.postMessage(this.token, formData).subscribe((res: any) => {
      console.log(res);
      if (res && res.status == 200) {
        this.fetchMessages(this.oppositeUser);
        this.messageAutoFetch();
        this.messageText = '';
      }
    }, err => {
      console.log(err);
    });
  }

  acceptChat() {
    console.log("oppositeUser", this.oppositeUser);
    console.log("currentUser", this.current_user);
    let formData = new FormData();
    formData.set("receiver_id", this.oppositeUser.id);
    formData.set("connection_id", this.oppositeUser.connection_id);
    formData.set("message_type", '10');
    formData.set("message", "Request accepted");
    //  formData.set("file_name", );

    this.apiService.postMessage(this.token, formData).subscribe((res: any) => {
      console.log(res);
      if (res && res.status == 200) {
        this.fetchMessages(this.oppositeUser);
        this.messageAutoFetch();
        this.messageText = '';
      }
    }, err => {
      console.log(err);
    });
  }
  get f() { return this.proposalForm.controls; }

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
  serviceChoose(s) {
    console.log(s);
    this.proposalForm.patchValue({ "service_id": s.id });
  }

  chooseImg(){
    $( "#msg-img" ).click();
  }
  imageMsg: any;
  imageLoadedMsg: any;
  importMsgFile(event) {
    console.log(event);
    if (event.target.files && event.target.files.length > 0) {
      let files = event.target.files || event.dataTransfer.files;
      if (!files.length)
        return;
      var fileName = files[0].name.toUpperCase();
      console.log(fileName.endsWith);
      if (fileName.endsWith(".JPG") || fileName.endsWith(".JPEG") || fileName.endsWith(".PNG")) {
        this.imageMsg = files[0];
        this.imageLoadedMsg = true;
        if(this.imageMsg){
          this.sendFileMessage();
        }
      } else {
        this.imageMsg = null;
        this.toastr.error("Please select a valid image file jpeg/jpg/png");
      }
    }

  }


//   "receiver_id=User ID
// connection_id= Connection ID
// message_type = Video message=>2, Image=>4, Any other File upload => 5, Normal text => 3 , '6'=>'Send Contract', '7'=>'Accept Contract', '8'=>'Withdraw Contract', '9'=>'Completed Contract', '10'=>'Accept Request', '11'=>'Decline Your Request'
// message=Message Text
// file_name = Upload video/image/another file
// media_file = 1 => If any file send"

  sendFileMessage() {
    console.log("sendFileMessage");

    if (this.fetchMessagesRes.can_chat == 0) {
      this.toastr.warning("You can't message at this moment");
      return;
    }
    this.scrollToBottom();
    if (this.imageMsg) {
      console.log(this.imageMsg);
      console.log("oppositeUser", this.oppositeUser);
      console.log("currentUser", this.current_user);
      let formData = new FormData();
      formData.set("receiver_id", this.oppositeUser.id);
      formData.set("connection_id", this.oppositeUser.connection_id);
      formData.set("message_type", '4');
      formData.set("file_name", this.imageMsg);
      formData.set("media_file", '1');
      formData.set("message", this.imageMsg);
      //  formData.set("file_name", );

      this.apiService.postMessage(this.token, formData).subscribe((res: any) => {
        console.log(res);
        if (res && res.status == 200) {
          this.fetchMessages(this.oppositeUser);
          this.messageAutoFetch();
          // this.messageText = '';
        }
      }, err => {
        console.log(err);
      });
    }

  }


}
