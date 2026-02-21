import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteC } from './route-c';

describe('RouteC', () => {
  let component: RouteC;
  let fixture: ComponentFixture<RouteC>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouteC]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RouteC);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
