import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyPostDetailsRoutingModule } from './my-post-details-routing.module';
import { MyPostDetailsComponent } from './my-post-details.component';
import { IncludeModule } from 'src/app/includes/include.module';


@NgModule({
  declarations: [MyPostDetailsComponent],
  imports: [
    CommonModule,
    MyPostDetailsRoutingModule,
    IncludeModule
  ]
})
export class MyPostDetailsModule { }
