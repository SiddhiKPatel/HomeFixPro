import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SearchHeaderComponent } from './search-header/search-header.component';

const PAGES_COMPONENTS = [
  HeaderComponent,
  FooterComponent,
  SearchHeaderComponent
];


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule
    ],
    declarations: [
        PAGES_COMPONENTS
    ],
    exports: [
        PAGES_COMPONENTS
    ]
})
export class IncludeModule { }
