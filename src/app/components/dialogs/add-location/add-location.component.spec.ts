import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddLocationModalDialog } from './add-location.component';

describe('AddCategoryComponent', () => {
  let component: AddLocationModalDialog;
  let fixture: ComponentFixture<AddLocationModalDialog>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AddLocationModalDialog],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLocationModalDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
