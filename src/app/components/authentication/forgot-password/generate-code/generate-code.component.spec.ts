import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateCodeComponent } from './generate-code.component';

describe('GenerateCodeComponent', () => {
  let component: GenerateCodeComponent;
  let fixture: ComponentFixture<GenerateCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenerateCodeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenerateCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
