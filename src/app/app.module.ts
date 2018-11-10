import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { MetricDisplayComponent } from './metric-display/metric-display.component';

@NgModule({
  declarations: [
    AppComponent,
    LineChartComponent,
    MetricDisplayComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
