import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OppurtunityDetailsComponent } from './oppurtunity-details.component';

describe('OppurtunityDetailsComponent', () => {
  let component: OppurtunityDetailsComponent;
  let fixture: ComponentFixture<OppurtunityDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OppurtunityDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OppurtunityDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
