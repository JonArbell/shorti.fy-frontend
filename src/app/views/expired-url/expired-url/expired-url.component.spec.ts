import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpiredUrlComponent } from './expired-url.component';

describe('ExpiredUrlComponent', () => {
  let component: ExpiredUrlComponent;
  let fixture: ComponentFixture<ExpiredUrlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpiredUrlComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpiredUrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
