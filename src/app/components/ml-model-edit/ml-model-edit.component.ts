import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MetricType } from 'src/app/core/models/enums/enums';
import { MlModel } from 'src/app/core/models/ml-model.model';
import { MlModelService } from 'src/app/core/services/ml-model.service';

@Component({
  selector: 'app-ml-model-edit',
  templateUrl: './ml-model-edit.component.html',
  styleUrls: ['./ml-model-edit.component.css']
})
export class MlModelEditComponent implements OnInit {
  constructor(private activatedRoute: ActivatedRoute, private service: MlModelService) { }
  model?: MlModel;
  modelMetrics?:any;
  metrics?:any;
  MetricType =MetricType;
  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe(params => {
      var id = +this.activatedRoute.snapshot.params['id'];

      this.loadMlModel(id);
    });
  }

  loadMlModel(id: number) {
    this.service.getMlModelById(id).subscribe(data => {
      console.log(data)
      this.model = data;
    });

    this.service.getMlModelMetrics(id).subscribe((metrics: any) => {
      console.log(metrics)

      this.modelMetrics = metrics;
      this.metrics = JSON.parse(metrics.data);
 
      console.log(    this.metrics )
    });
  }

  downloadFile(): void {
    if (!this.model) return;

    this.service.downloadModel(this.model.id).subscribe(blob => {

debugger
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = this.model?.fileName?? "model.zip";
      link.click();
      window.URL.revokeObjectURL(url);
    });
  }
}
