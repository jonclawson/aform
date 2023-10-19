import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AFormModule } from './aform/aform.module';
import { NgLogoComponent } from './ng-logo.component';

@NgModule({
  imports: [BrowserModule, AFormModule],
  declarations: [AppComponent, NgLogoComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
