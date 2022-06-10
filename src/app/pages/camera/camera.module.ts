import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CameraRoutingModule } from './camera-routing.module';
import { CameraComponent } from './camera.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IncludeModule } from 'src/app/includes/include.module';
import { WebcamModule } from 'ngx-webcam';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [
    CameraComponent
  ],
  imports: [
    CommonModule,
    CameraRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    IncludeModule,
    WebcamModule,
    NgxSpinnerModule
  ],
  exports:[CameraComponent]
})
export class CameraModule { }
