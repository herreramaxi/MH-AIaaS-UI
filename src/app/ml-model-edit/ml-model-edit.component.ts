import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MlModel } from '../core/models/ml-model.model';
import { MlModelService } from '../core/services/ml-model.service';

@Component({
  selector: 'app-ml-model-edit',
  templateUrl: './ml-model-edit.component.html',
  styleUrls: ['./ml-model-edit.component.css']
})
export class MlModelEditComponent implements OnInit {
  constructor(private activatedRoute: ActivatedRoute, private service: MlModelService) { }
  model?: MlModel;

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe(params => {
      var id = +this.activatedRoute.snapshot.params['id'];

      this.loadMlModel(id);
    });
  }

  loadMlModel(id: number) {
    this.service.getMlModelById(id).subscribe(data => {
      this.model = data;
    });
  
  }
}
