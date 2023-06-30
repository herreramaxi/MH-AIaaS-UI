import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndpointEditConsumeComponent } from './endpoint-edit-consume.component';

describe('EndpointEditConsumeComponent', () => {
  let component: EndpointEditConsumeComponent;
  let fixture: ComponentFixture<EndpointEditConsumeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EndpointEditConsumeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EndpointEditConsumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
