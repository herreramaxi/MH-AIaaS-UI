import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDatasetMetadataComponent } from './edit-dataset-metadata.component';

describe('EditDatasetMetadataComponent', () => {
  let component: EditDatasetMetadataComponent;
  let fixture: ComponentFixture<EditDatasetMetadataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDatasetMetadataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditDatasetMetadataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
