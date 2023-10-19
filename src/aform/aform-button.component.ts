import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'aform-button',
  template: `
  <button 
  mat-flat-button 
    [type]="type"
    [color]="state" 
    (click)="clickButton()">
      <ng-content></ng-content>
  </button>
  `,
})
export class AFormButtonComponent {
  @Output() onClick: EventEmitter<any> = new EventEmitter();
  @Input() state: string = 'primary';
  @Input() type: string = 'button';
  clickButton() {
    this.onClick.emit();
  }
}
