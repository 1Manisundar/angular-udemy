import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicRoute } from './dynamic-route';

describe('DynamicRoute', () => {
  let component: DynamicRoute;
  let fixture: ComponentFixture<DynamicRoute>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynamicRoute]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicRoute);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
