import 'zone.js/dist/zone';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { AFormField } from './aform.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'aform',
  template: `
  <div >
    <ng-content select="[title]"></ng-content>
    <form [formGroup]="aform" action="action" (ngSubmit)="submit()" > 
      <ng-container *ngFor="let field of aFormFields">
        <ng-container *ngIf="field.control">
          <div >
            <aform-field 
            [type]="field.type"
            [name]="field.name"
            [label]="field.label"
            [placeholder]="field.placeholder"
            [control]="field.control"
            [errors]="field.errors"
            />
          </div>
        </ng-container>
      </ng-container>
      <div *ngIf="submitButton" >
        <div class=" flex-justify-content-end"> 
          <aform-button *ngIf="cancelButton" type="reset" (click)="reset()" state="secondary" onClick=""><span>{{cancelButton}}</span></aform-button>
          <aform-button *ngIf="submitButton" type="submit" onClick=""><span>{{submitButton}}</span></aform-button>
        </div>
      </div>
    </form>
  </div>
  `,
})
export class AFormComponent implements OnInit {
  @Input() title?: string;
  @Input() fields: AFormField[] = [];
  @Input() submitButton?: string;
  @Input() cancelButton?: string;
  @Output() onSubmit: EventEmitter<any> = new EventEmitter();
  @Output() onChange: EventEmitter<any> = new EventEmitter();
  public aFormFields?: AFormField[] = [];
  public aform: FormGroup<any> = new FormGroup({});

  ngOnInit(): void {
    const formGroup: any = {};
    this.aFormFields = this.fields.map((field) => {
      let validators = !field.validators
        ? null
        : this.getValidators(field.validators);
      formGroup[field.name] = new FormControl(
        null,
        this.getValidators(field.validators),
        this.getAsyncValidators(field.asyncValidators)
      );

      return { ...field, control: formGroup[field.name] };
    });
    this.aform = new FormGroup(formGroup);
    this.aform.valueChanges.subscribe(() => {
      this.onChange.emit({
        form: this.aform,
        value: this.aform.value,
      });
    });
  }

  submit(): void {
    if (this.aform && !this.aform.invalid) {
      this.onSubmit.emit(this.aform.value);
    }
  }

  reset(): void {
    this.aform.reset();
  }

  getValidators(validators?: Function[]): any[] {
    if (!validators) {
      return [];
    }
    return validators.map((v: Function) => {
      if (typeof v === 'string' && v in Validators) {
        return Validators[v];
      }

      return (control: FormControl): ValidationErrors | null => {
        return v(control.value);
      };
    });
  }

  getAsyncValidators(validators?: any[]): any[] {
    if (!validators) {
      return [];
    }
    return validators.map((v: Function) => {
      return (
        control: FormControl
      ):
        | Promise<ValidationErrors | null>
        | Observable<ValidationErrors | null> => {
        return v(control.value);
      };
    });
  }
}
