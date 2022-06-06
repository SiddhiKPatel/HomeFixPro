import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MyPostDetailsComponent } from './my-post-details.component';

describe('MyPostDetailsComponent', () => {
  let component: MyPostDetailsComponent;
  let fixture: ComponentFixture<MyPostDetailsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MyPostDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyPostDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
