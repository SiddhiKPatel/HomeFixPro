import { Component, OnInit } from '@angular/core';

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
  constructor() { }

  ngOnInit(): void {
  }
  saveAvailability() {
    this.week.forEach((element, i) => {
      var inputValue = (<HTMLInputElement>document.getElementById('dp' + i)).value;
      var inputValue1 = (<HTMLInputElement>document.getElementById('to' + i)).value;
      this.fromValue.push(inputValue)
      this.toValue.push(inputValue1)
    });
    let data = this.week.filter(x => x.checked != false)
  }
  changeCheckbox(i) {
    this.week[i].checked = !this.week[i].checked;
  }
}
