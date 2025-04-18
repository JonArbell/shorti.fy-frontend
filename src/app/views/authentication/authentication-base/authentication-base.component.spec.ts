import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticationBaseComponent } from './authentication-base.component';

describe('AuthenticationBaseComponent', () => {
  let component: AuthenticationBaseComponent;
  let fixture: ComponentFixture<AuthenticationBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthenticationBaseComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthenticationBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
