import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarExameComponent } from './registrar-exame.component';

describe('RegistrarExameComponent', () => {
  let component: RegistrarExameComponent;
  let fixture: ComponentFixture<RegistrarExameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrarExameComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistrarExameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
