import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateUrlFormComponent } from './update-url-form.component';

describe('UpdateUrlFormComponent', () => {
  let component: UpdateUrlFormComponent;
  let fixture: ComponentFixture<UpdateUrlFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateUrlFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateUrlFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
