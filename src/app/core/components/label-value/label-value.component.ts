import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-label-value',
  templateUrl: './label-value.component.html',
  styleUrls: ['./label-value.component.css']
})
export class LabelValueComponent {
  @Input()
  label?: string;
  @Input()
  value: any;
}
