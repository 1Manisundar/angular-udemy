import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteE } from './route-e';

describe('RouteE', () => {
  let component: RouteE;
  let fixture: ComponentFixture<RouteE>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouteE]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RouteE);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
