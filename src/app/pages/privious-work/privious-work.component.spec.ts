import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PriviousWorkComponent } from './privious-work.component';

describe('PriviousWorkComponent', () => {
  let component: PriviousWorkComponent;
  let fixture: ComponentFixture<PriviousWorkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PriviousWorkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PriviousWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
