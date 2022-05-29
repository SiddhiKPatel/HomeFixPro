import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogRoutingModule } from './blog-routing.module';
import { BlogComponent } from '../blog/blog.component';
import { IncludeModule } from 'src/app/includes/include.module';
import {NgxSpinnerModule} from "ngx-spinner";

@NgModule({
  declarations: [BlogComponent],
  imports: [
    CommonModule,
    BlogRoutingModule,
    IncludeModule,
    NgxSpinnerModule
  ]
})
export class BlogModule { }
