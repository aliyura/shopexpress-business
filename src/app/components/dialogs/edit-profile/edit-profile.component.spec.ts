import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EditProfileModalDialog } from './edit-profile.component';

describe('AddCategoryComponent', () => {
  let component: EditProfileModalDialog;
  let fixture: ComponentFixture<EditProfileModalDialog>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EditProfileModalDialog ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProfileModalDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
