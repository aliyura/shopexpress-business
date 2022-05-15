import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { VoucherCardsComponent } from './voucher-cards.component';

describe('VoucherCardsComponent', () => {
  let component: VoucherCardsComponent;
  let fixture: ComponentFixture<VoucherCardsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VoucherCardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoucherCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
