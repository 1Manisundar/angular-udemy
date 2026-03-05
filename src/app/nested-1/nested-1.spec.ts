import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Nested1 } from './nested-1';

describe('Nested1', () => {
  let component: Nested1;
  let fixture: ComponentFixture<Nested1>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Nested1]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Nested1);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
