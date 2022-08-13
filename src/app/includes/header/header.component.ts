import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PagesService } from 'src/app/service/pages.service';
import { UserService } from 'src/app/service/user.service';
declare var $;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  headerData: any;
  fName: any;
  lName: any;
  token: any;
  role: any;
  userId: any;

  constructor(private page: PagesService,
    private router: Router,
    private userService: UserService) {
  }

  ngOnInit(): void {
    /// check user
    debugger
    this.checkUser().then(() => {
      this.jsInit();
    });

    /// api Call
    this.getHeader();

  }

  jsInit() {
    $("#sticker").sticky({
      topSpacing: 0,
      zIndex: 9999
    });
    $('#main_menu').slicknav();

    // $(function () {
    //   $("#toTop").scrollToTop(1000);
    // });

    // responsive menu
    $('.bar').click(function () {
      $('.main_menu').slideToggle();
      return false;
    });

    // menu arrow
    $(".main_menu ul").parent("li").children('a').append(' <i class="icofont-simple-down"></i>');

    // responsive menu
    $(".main_menu ul li").click(function () {
      $(this).children("ul").slideToggle();
      return false;
    });
  }

  async checkUser() {
    this.fName = localStorage.getItem("fName");
    this.lName = localStorage.getItem("lName");
    this.token = localStorage.getItem("token");
    this.role = localStorage.getItem("roleId");
    this.userId = localStorage.getItem("userId");
  }

  logout() {
    this.userService.logOut();
    this.router.navigate(['/login']);
    this.checkUser();
  }

  getHeader() {
    this.page.getHeader().subscribe((res: any) => {
      if (res.status) {
        this.headerData = res;
      }
    }, err => {
      console.log(err);
    })
  }

  ngAfterViewChecked() {
    let data = sessionStorage.getItem('activeMenu')
    if (data == 'create') {
      let data = document.getElementById('create')
      data.classList.add('test')
    }
    if (data == 'opp') {
      let data = document.getElementById('opp')
      data.classList.add('test')
    }
    if (data == 'job') {
      let data = document.getElementById('job')
      data.classList.add('test')
    }
    if (data == 'post') {
      let data = document.getElementById('post')
      data.classList.add('test')
    }
    if (data == 'inbox') {
      let data = document.getElementById('inbox')
      data.classList.add('test')
    }
  }

  menuClick(param: any) {
    sessionStorage.setItem('activeMenu', param)
  }

}
