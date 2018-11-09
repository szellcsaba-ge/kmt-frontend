import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { bufferCount, delay, scan, takeLast, take } from 'rxjs/operators';
import { ChartPoint } from './models/chartPoint';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title = 'kmt-frontend';
  public chartData: BehaviorSubject<ChartPoint>;
  public chartDataLast5: ChartPoint[] = [];
  public chartData5: BehaviorSubject<ChartPoint>;
  public chartData5Last5: ChartPoint[] = [];
  public chartData25: BehaviorSubject<ChartPoint>;
  public randomValue = 50;

  constructor() {
    this.chartData = new BehaviorSubject(new ChartPoint(50));
    this.chartData5 = new BehaviorSubject(new ChartPoint(50));
    this.chartData25 = new BehaviorSubject(new ChartPoint(50));

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

    /*
    this.chartData.pipe(delay(5000 * 0.70), bufferCount(5)).subscribe(value => {
      const sumData = value.reduce((prev, curr) => {
        return new ChartPoint(prev.value + curr.value);
      });
      sumData.value /= 5;
      this.chartData5.next(sumData);
    });

    this.chartData5.pipe(delay(25000 * 0.70), bufferCount(5)).subscribe(value => {
      const sumData = value.reduce((prev, curr) => {
        return new ChartPoint(prev.value + curr.value);
      });
      sumData.value /= 5;
      this.chartData25.next(sumData);
    });
    */

    setInterval(() => this.generateRandomData(), 200);
  }

  generateRandomData() {
    this.randomValue = Math.max(0, Math.min(100, this.randomValue - 10 + Math.random() * 20));
    this.chartData.next({date: new Date(), value: this.randomValue});
  }
}
