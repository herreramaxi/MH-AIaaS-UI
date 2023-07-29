import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-ellipsis-text',
  templateUrl: './ellipsis-text.component.html',
  styleUrls: ['./ellipsis-text.component.css']
})
export class EllipsisTextComponent {
  @Input()
  inputText?: string;
}
