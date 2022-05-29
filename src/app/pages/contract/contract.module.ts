import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContractRoutingModule } from './contract-routing.module';
import { ContractComponent } from './contract.component';
import { IncludeModule } from 'src/app/includes/include.module';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgxSpinnerModule} from "ngx-spinner";

@NgModule({
  declarations: [ContractComponent],
  imports: [
    CommonModule,
    ContractRoutingModule,
    IncludeModule,
    AngularEditorModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule
  ]
})
export class ContractModule { }
