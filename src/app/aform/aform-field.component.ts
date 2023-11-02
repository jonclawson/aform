import 'zone.js/dist/zone';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'aform-field',
  template: `
  <mat-form-field >
    <mat-label>{{label}}</mat-label>
      <input matInput
      [attr.type]="type" 
      [attr.name]="name" 
      placeholder="{{placeholder}}"
      [formControl]="control"
      required
      >

      <mat-error *ngIf="control.invalid">
        {{control.errors && control.errors['required'] && ('Required')}}
        <ng-container *ngFor="let error of control.errors | keyvalue">
          <p>{{errors && errors[error.key] && errors[error.key]}}</p>
        </ng-container>
      </mat-error>
    </mat-form-field>
  `,
})
export class AFormFieldComponent {
  @Input() label?: string;
  @Input() type: string = '';
  @Input() name: string = '';
  @Input() placeholder?: string;
  @Input() control: FormControl = new FormControl();
  @Input() errors?: any;
}
