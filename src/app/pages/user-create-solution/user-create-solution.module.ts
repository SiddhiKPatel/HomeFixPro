import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserCreateSolutionRoutingModule } from './user-create-solution-routing.module';
import { UserCreateSolutionComponent } from './user-create-solution.component';
import { IncludeModule } from 'src/app/includes/include.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { AngularEditorModule } from '@kolkov/angular-editor';

@NgModule({
  declarations: [UserCreateSolutionComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UserCreateSolutionRoutingModule,
    NgSelectModule,
    IncludeModule,
    AngularEditorModule
  ]
})
export class UserCreateSolutionModule { }
