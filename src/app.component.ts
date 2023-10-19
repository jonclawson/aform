import 'zone.js/dist/zone';
import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { BehaviorSubject, map, Observable, take } from 'rxjs';

@Component({
  selector: 'my-app',
  template: `
    <div class="container">
      <div >
        <h1><ng-logo/>Form</h1>
        <p>
          Automatic Angular Reactive Form. 
          An Angular module that steamlines Angular form creation.
        </p>
        <aform 
          class="flex-justify-content-center" width="200"
          (onSubmit)="onSubmit($event)" 
          (onChange)="onChanges($event)" 
          [fields]="fields"
          submitButton="Submit"
          cancelButton="Cancel">
          <p title>Example Sign Up Form</p>
        </aform>
      </div>
    </div>
  `,
})
export class AppComponent {
  public formSubject: BehaviorSubject<any> = new BehaviorSubject({});

  public fields = [
    {
      type: 'text',
      name: 'name',
      label: 'Name',
      validators: ['required'],
    },
    {
      type: 'email',
      name: 'email',
      label: 'Email',
      validators: ['required', 'email'],
      errors: {
        email: 'A valid email is required',
      },
    },
    {
      type: 'password',
      name: 'password',
      label: 'Password',
      validators: ['required', this.getPasswordValidator()],
      errors: {
        uppercase: 'Uppercase characters required.',
        lowercase: 'Lowercase characters required.',
        numbers: 'Numbers required.',
        special: 'Special characters required.',
        length: 'Must be 8 characters',
      },
    },
    {
      type: 'password',
      name: 'confirm',
      label: 'Confirm Password',
      validators: ['required'],
      asyncValidators: [this.getAsyncPasswordMatch()],
      errors: {
        passwordsMatch: 'Passwords do not match.',
      },
    },
  ];

  onSubmit(payload: any) {
    console.log(payload);
  }

  onChanges(payload: { form: any; value: any }) {
    console.log(payload);
    this.formSubject.next(payload.value);
  }

  getPasswordValidator() {
    return (value: string) => {
      // 8 minimum, upper, lower, number and special
      // "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
      const rules = {
        uppercase: /[A-Z]/,
        lowercase: /[a-z]/,
        numbers: /\d/,
        special: /[@$!%*?&#]/,
      };
      const errors: any = {};
      Object.entries(rules).forEach((rule: any) => {
        if (!rule[1].test(value)) {
          errors[rule[0]] = true;
        }
        if (value?.length < 8) {
          errors.length = true;
        }
      });
      return errors;
    };
  }

  getAsyncPasswordMatch() {
    return (value: string) => {
      return this.formSubject.pipe(take(1)).pipe(
        map((form) => {
          if (form.password !== value) {
            return { passwordsMatch: true };
          }
        })
      );
    };
  }
}
