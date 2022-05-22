import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-estimates',
  templateUrl: './create-estimates.component.html',
  styleUrls: ['./create-estimates.component.css']
})
export class CreateEstimatesComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem("token") == null) {
      this.router.navigate(['/login']);
    }
  }


}
