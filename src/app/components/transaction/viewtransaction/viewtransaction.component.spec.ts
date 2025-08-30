import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewtransactionComponent } from './viewtransaction.component';

describe('ViewtransactionComponent', () => {
  let component: ViewtransactionComponent;
  let fixture: ComponentFixture<ViewtransactionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewtransactionComponent]
    });
    fixture = TestBed.createComponent(ViewtransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
