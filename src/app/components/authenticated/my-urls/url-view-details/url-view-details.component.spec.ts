import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UrlViewDetailsComponent } from './url-view-details.component';

describe('UrlViewDetailsComponent', () => {
  let component: UrlViewDetailsComponent;
  let fixture: ComponentFixture<UrlViewDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UrlViewDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UrlViewDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
