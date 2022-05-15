import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddCategoryModalDialog } from './add-category.component';

describe('AddCategoryComponent', () => {
  let component: AddCategoryModalDialog;
  let fixture: ComponentFixture<AddCategoryModalDialog>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCategoryModalDialog ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCategoryModalDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
