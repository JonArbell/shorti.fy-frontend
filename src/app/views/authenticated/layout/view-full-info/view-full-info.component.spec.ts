import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFullInfoComponent } from './view-full-info.component';

describe('ViewFullInfoComponent', () => {
  let component: ViewFullInfoComponent;
  let fixture: ComponentFixture<ViewFullInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewFullInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewFullInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
