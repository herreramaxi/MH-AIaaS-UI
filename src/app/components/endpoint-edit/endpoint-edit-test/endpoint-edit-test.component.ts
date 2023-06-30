import { Component, Input, OnInit } from '@angular/core';
import { PredictService } from 'src/app/core/services/prediction.service';

@Component({
  selector: 'app-endpoint-edit-test',
  templateUrl: './endpoint-edit-test.component.html',
  styleUrls: ['./endpoint-edit-test.component.css']
})
export class EndpointEditTestComponent implements OnInit {
  @Input()
  endpointId: number;
  input?: string;
  predictedSample?: any;

  constructor(private predictionService: PredictService) { }

  ngOnInit(): void {
    if (!this.endpointId) return;

    this.predictionService.getPredictionInputSample(this.endpointId).subscribe(data => {
      console.log(data)

      if (!data) return;

      this.input = JSON.stringify(data, null, 2)
    })
  }

  endpointResponse?: string;

  getPrediction() {

    const predictionInput = JSON.parse(this.input ?? "");
    this.predictionService.getPrediction(this.endpointId, predictionInput)
      .subscribe(data => {
        if (!data) return;

        this.predictedSample = JSON.stringify(data, null, 2);
      })
  }
}
