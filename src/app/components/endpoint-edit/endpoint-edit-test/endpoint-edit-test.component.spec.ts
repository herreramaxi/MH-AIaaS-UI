import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndpointEditTestComponent } from './endpoint-edit-test.component';

describe('EndpointEditTestComponent', () => {
  let component: EndpointEditTestComponent;
  let fixture: ComponentFixture<EndpointEditTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EndpointEditTestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EndpointEditTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
