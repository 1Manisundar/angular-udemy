import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteD } from './route-d';

describe('RouteD', () => {
  let component: RouteD;
  let fixture: ComponentFixture<RouteD>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouteD]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RouteD);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
