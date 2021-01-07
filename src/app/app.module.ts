import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { ProactiveComponent } from './proactive/proactive.component';
import { ReactiveComponent } from './reactive/reactive.component';

@NgModule({
  declarations: [
    AppComponent,
    ProactiveComponent,
    ReactiveComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
