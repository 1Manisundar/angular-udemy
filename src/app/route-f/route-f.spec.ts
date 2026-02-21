import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteF } from './route-f';

describe('RouteF', () => {
  let component: RouteF;
  let fixture: ComponentFixture<RouteF>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouteF]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RouteF);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
