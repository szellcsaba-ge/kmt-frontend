import { Component, OnInit, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ChartPoint } from '../models/chartPoint';

@Component({
  selector: 'app-metric-display',
  templateUrl: './metric-display.component.html',
  styleUrls: ['./metric-display.component.css']
})
export class MetricDisplayComponent implements OnInit {
  @Input() chartData: BehaviorSubject<ChartPoint>;

  public chartDataLast5: ChartPoint[] = [];
  public chartData5: BehaviorSubject<ChartPoint>;
  public chartData5Last5: ChartPoint[] = [];
  public chartData25: BehaviorSubject<ChartPoint>;

  constructor() {
    this.chartData = new BehaviorSubject(new ChartPoint(50));
    this.chartData5 = new BehaviorSubject(new ChartPoint(50));
    this.chartData25 = new BehaviorSubject(new ChartPoint(50));
  }

  ngOnInit() {
    this.chartData.pipe(delay(4500)).subscribe((value: ChartPoint) => {
      this.chartDataLast5.push(value);
      if (this.chartDataLast5.length > 5) {
        this.chartDataLast5.shift();
      }
      const sumData = this.chartDataLast5.reduce((prev, curr) => {
        return new ChartPoint(prev.value + curr.value);
      });
      sumData.value /= 5;
      this.chartData5.next(sumData);
    });

    this.chartData5.pipe(delay(24500)).subscribe((value: ChartPoint) => {
      this.chartData5Last5.push(value);
      if (this.chartData5Last5.length > 5) {
        this.chartData5Last5.shift();
      }
      const sumData = this.chartData5Last5.reduce((prev, curr) => {
        return new ChartPoint(prev.value + curr.value);
      });
      sumData.value /= 5;
      this.chartData25.next(sumData);
    });
  }
}
