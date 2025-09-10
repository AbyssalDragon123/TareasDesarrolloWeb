import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Quejas } from './quejas';

describe('Quejas', () => {
  let component: Quejas;
  let fixture: ComponentFixture<Quejas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Quejas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Quejas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
