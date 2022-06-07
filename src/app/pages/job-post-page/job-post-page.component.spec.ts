import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { JobPostPageComponent } from './job-post-page.component';

describe('JobPostPageComponent', () => {
  let component: JobPostPageComponent;
  let fixture: ComponentFixture<JobPostPageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ JobPostPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobPostPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
