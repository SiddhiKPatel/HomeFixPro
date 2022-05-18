import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyPostRoutingModule } from './my-post-routing.module';
import { MyPostComponent } from './my-post.component';
import { IncludeModule } from 'src/app/includes/include.module';


@NgModule({
  declarations: [MyPostComponent],
  imports: [
    CommonModule,
    MyPostRoutingModule,
    IncludeModule
  ]
})
export class MyPostModule { }
