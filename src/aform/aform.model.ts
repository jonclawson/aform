import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

export interface Aform {
  action: string;
  onSubmit: Function;
}

export interface AFormField {
  type: string;
  name: string;
  label: string;
  placeholder?: string;
  control?: FormControl;
  validators?: any[];
  asyncValidators?: any[];
  errors?: any;
}
