import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceExample } from './service-example';

describe('ServiceExample', () => {
  let component: ServiceExample;
  let fixture: ComponentFixture<ServiceExample>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceExample]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceExample);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
