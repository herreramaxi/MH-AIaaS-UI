import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatasetViewSchemaComponent } from './dataset-view-schema.component';

describe('DatasetViewSchemaComponent', () => {
  let component: DatasetViewSchemaComponent;
  let fixture: ComponentFixture<DatasetViewSchemaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DatasetViewSchemaComponent]
    });
    fixture = TestBed.createComponent(DatasetViewSchemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
