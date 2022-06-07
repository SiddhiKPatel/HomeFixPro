import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCreateSolutionComponent } from './user-create-solution.component';

describe('UserCreateSolutionComponent', () => {
  let component: UserCreateSolutionComponent;
  let fixture: ComponentFixture<UserCreateSolutionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserCreateSolutionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCreateSolutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
