import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddSubCategoryModalDialog } from './add-sub-category.component';

describe('AddSubCategoryComponent', () => {
  let component: AddSubCategoryModalDialog;
  let fixture: ComponentFixture<AddSubCategoryModalDialog>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSubCategoryModalDialog ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSubCategoryModalDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
