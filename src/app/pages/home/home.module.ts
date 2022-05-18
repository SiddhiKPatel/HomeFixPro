import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { HeaderComponent } from 'src/app/includes/header/header.component';
import { FooterComponent } from 'src/app/includes/footer/footer.component';
import { IncludeModule } from 'src/app/includes/include.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [HomeComponent,
    // HeaderComponent,
    // FooterComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    IncludeModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class HomeModule { }
