import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyAcountComponent } from './verify-acount.component';

describe('VerifyAcountComponent', () => {
  let component: VerifyAcountComponent;
  let fixture: ComponentFixture<VerifyAcountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifyAcountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerifyAcountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
