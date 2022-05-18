import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEstimatesComponent } from './create-estimates.component';

describe('CreateEstimatesComponent', () => {
  let component: CreateEstimatesComponent;
  let fixture: ComponentFixture<CreateEstimatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateEstimatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEstimatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
