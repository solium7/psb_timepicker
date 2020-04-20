import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {EoTimePicker2Module} from './components/eo-time-picker2/eo-time-picker2.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    EoTimePicker2Module,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
