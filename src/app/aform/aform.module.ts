import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AFormComponent } from './aform.component';
import { AFormFieldComponent } from './aform-field.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AFormButtonComponent } from './aform-button.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatButtonModule,
  ],
  declarations: [AFormComponent, AFormFieldComponent, AFormButtonComponent],
  exports: [AFormComponent, AFormFieldComponent, AFormButtonComponent],
})
export class AFormModule {}
