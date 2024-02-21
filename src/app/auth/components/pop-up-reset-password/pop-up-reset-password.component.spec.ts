import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpResetPasswordComponent } from './pop-up-reset-password.component';

describe('PopUpResetPasswordComponent', () => {
  let component: PopUpResetPasswordComponent;
  let fixture: ComponentFixture<PopUpResetPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopUpResetPasswordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopUpResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
