import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticatedBasePageComponent } from './authenticated-base-page.component';

describe('AuthenticatedBasePageComponent', () => {
  let component: AuthenticatedBasePageComponent;
  let fixture: ComponentFixture<AuthenticatedBasePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthenticatedBasePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthenticatedBasePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
