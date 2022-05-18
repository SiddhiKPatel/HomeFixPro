import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubmitProposalRoutingModule } from './submit-proposal-routing.module';
import { SubmitProposalComponent } from './submit-proposal.component';
import { IncludeModule } from 'src/app/includes/include.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [SubmitProposalComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SubmitProposalRoutingModule,
    IncludeModule
  ]
})
export class SubmitProposalModule { }
