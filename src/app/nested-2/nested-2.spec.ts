import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Nested2 } from './nested-2';

describe('Nested2', () => {
  let component: Nested2;
  let fixture: ComponentFixture<Nested2>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Nested2]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Nested2);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
