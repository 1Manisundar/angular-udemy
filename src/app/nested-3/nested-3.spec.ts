import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Nested3 } from './nested-3';

describe('Nested3', () => {
  let component: Nested3;
  let fixture: ComponentFixture<Nested3>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Nested3]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Nested3);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
