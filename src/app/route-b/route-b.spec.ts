import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteB } from './route-b';

describe('RouteB', () => {
  let component: RouteB;
  let fixture: ComponentFixture<RouteB>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouteB]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RouteB);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
