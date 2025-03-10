import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticationBasePageComponent } from './authentication-base-page.component';

describe('AuthenticationBasePageComponent', () => {
  let component: AuthenticationBasePageComponent;
  let fixture: ComponentFixture<AuthenticationBasePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthenticationBasePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthenticationBasePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
