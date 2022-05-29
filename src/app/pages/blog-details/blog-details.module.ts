import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogDetailsRoutingModule } from './blog-details-routing.module';
import { BlogDetailsComponent } from './blog-details.component';
import { IncludeModule } from 'src/app/includes/include.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgxSpinnerModule} from "ngx-spinner";
@NgModule({
  declarations: [BlogDetailsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BlogDetailsRoutingModule,
    IncludeModule,
    NgxSpinnerModule
  ]
})
export class BlogDetailsModule { }
