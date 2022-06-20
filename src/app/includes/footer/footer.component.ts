import { Component, OnInit } from '@angular/core';
import { PagesService } from 'src/app/service/pages.service';
declare var $;

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  footerData: any;
  constructor(private page: PagesService) { }

  ngOnInit(): void {
    // $(function () {
    //   $("#toTop").scrollToTop(1000);
    // });
    /// api Call
    this.getFooter();
  }

  getFooter() {
    this.page.getFooter().subscribe((res: any) => {
      if (res.status) {
        this.footerData = res;
      }
    }, err => {
      console.log(err);
    })
  }

  scrollTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

}
