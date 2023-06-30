import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndpointEditConfigurationComponent } from './endpoint-edit-configuration.component';

describe('EndpointEditConfigurationComponent', () => {
  let component: EndpointEditConfigurationComponent;
  let fixture: ComponentFixture<EndpointEditConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EndpointEditConfigurationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EndpointEditConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
