import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-availability',
  templateUrl: './availability.component.html',
  styleUrls: ['./availability.component.css']
})
export class AvailabilityComponent implements OnInit {
  week = [{
    name: 'Sun',
    checked: true
  }, {
    name: 'Mon',
    checked: true
  }, {
    name: 'Tues',
    checked: true
  }, {
    name: 'Wed',
    checked: true
  },
  {
    name: 'Thur',
    checked: true
  }, {
    name: 'Fri',
    checked: true
  }, {
    name: 'Sat',
    checked: true
  },];
  startTime: string[] = ['12 am', '1 am', '2 am', '3 am', '4 am', '5 am', '6 am', '7 am', '8 am', '9 am', '10 am', '11 am', '12 pm',
    '1 pm', '2 pm', '3 pm', '4 pm', '5 pm', '6 pm', '7 pm', '8 pm', '9 pm', '10 pm', '11 pm'];

  selectedValue = null;
  fromValue: any = [];
  toValue: any = [];
  userId: string;
  fromtime = "";
  toTime = "";
  endTime = this.startTime;
  constructor(private userService: UserService,
    private router: Router,
    private toastr: ToastrService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.userId = localStorage.getItem("userId");
  }
  ngAfterViewInit() {
    setTimeout(() =>
      this.getAvailibility()
      , 5000);
  }

  getAvailibility() {
    const token = localStorage.getItem("token");
    let obj = {
      user_id: this.userId,
    }
    this.userService.getAvailibilty(token, obj).subscribe((res: any) => {
      if (res.status) {
        this.week = res.response_data.name;
        res.response_data.start_time.forEach((element, i) => {
          (<HTMLInputElement>document.getElementById('dp' + i)).value = element;
        });
        res.response_data.end_time.forEach((element, i) => {
          (<HTMLInputElement>document.getElementById('to' + i)).value = element;
        });
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
  saveAvailability() {
    this.week.forEach((element, i) => {
      if (element.checked == false) {
        this.fromValue.push("")
        this.toValue.push("")
      } else {
        let inputValue = (<HTMLInputElement>document.getElementById('dp' + i)).value;
        let inputValue1 = (<HTMLInputElement>document.getElementById('to' + i)).value;
        this.fromValue.push(inputValue)
        this.toValue.push(inputValue1)
      }
    });
    const token = localStorage.getItem("token");
    let obj = {
      user_id: this.userId,
      name: this.week,
      start_time: this.fromValue,
      end_time: this.toValue
    }
    this.userService.setAvailibilty(token, obj).subscribe((res: any) => {
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
  changeCheckbox(i) {
    this.week[i].checked = !this.week[i].checked;
    if (this.week[i].checked == false) {
      let inputValue = (<HTMLInputElement>document.getElementById('dp' + i));
      let inputValue1 = (<HTMLInputElement>document.getElementById('to' + i));
      inputValue.disabled = true;
      inputValue1.disabled = true;
    } else {
      let inputValue = (<HTMLInputElement>document.getElementById('dp' + i));
      let inputValue1 = (<HTMLInputElement>document.getElementById('to' + i));
      inputValue.disabled = false;
      inputValue1.disabled = false;
    }
  }

  calender(){
    this.router.navigate(['/calender'])
  }
}
