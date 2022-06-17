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
  time: string[] = ['12 am', '1 am', '2 am', '3 am', '4 am', '5 am', '6 am', '7 am', '8 am', '9 am', '10 am', '11 am', '12 pm',
    '1 pm', '2 pm', '3 pm', '4 pm', '5 pm', '6 pm', '7 pm', '8 pm', '9 pm', '10 pm', '11 pm'];
  selectedValue = null;
  fromValue: any = [];
  toValue: any = [];
  userId: string;
  fromtime = "";
  toTime = "";
  constructor(private userService: UserService,
    private router: Router,
    private toastr: ToastrService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.userId = localStorage.getItem("userId");
  }
  saveAvailability() {
    this.week.forEach((element, i) => {
      let inputValue = (<HTMLInputElement>document.getElementById('dp' + i)).value;
      let inputValue1 = (<HTMLInputElement>document.getElementById('to' + i)).value;
      this.fromValue.push(inputValue)
      this.toValue.push(inputValue1)
    });
    this.fromValue.forEach(element => {
      this.fromtime = `"${this.fromtime},` + `"${element}"`
    });
    this.toValue.forEach(element => {
      this.toTime = `"${this.toTime},` + `"${element}"`
    });
    this.fromtime = this.fromtime.substring(8);
    this.toTime = this.toTime.substring(8);
    const token = localStorage.getItem("token");
    let obj = {
      user_id: this.userId,
      name: this.week,
      start_time: [this.fromtime],
      end_time: [this.toTime]
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
  }
}
