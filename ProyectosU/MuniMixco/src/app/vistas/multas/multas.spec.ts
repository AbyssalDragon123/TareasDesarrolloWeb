import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Multas } from './multas';

describe('Multas', () => {
  let component: Multas;
  let fixture: ComponentFixture<Multas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Multas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Multas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
