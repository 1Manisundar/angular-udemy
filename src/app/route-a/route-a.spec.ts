import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteA } from './route-a';

describe('RouteA', () => {
  let component: RouteA;
  let fixture: ComponentFixture<RouteA>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouteA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RouteA);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
