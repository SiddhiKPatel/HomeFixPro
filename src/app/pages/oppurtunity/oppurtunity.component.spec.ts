import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OppurtunityComponent } from './oppurtunity.component';

describe('OppurtunityComponent', () => {
  let component: OppurtunityComponent;
  let fixture: ComponentFixture<OppurtunityComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OppurtunityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OppurtunityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
