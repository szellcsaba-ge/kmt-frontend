import { Component } from '@angular/core';

import * as socketio from 'socket.io-client';
import { BehaviorSubject } from 'rxjs';
import { ChartPoint } from './models/chartPoint';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title = 'kmt-frontend';

  public socket: any;

  public data: any[] = [];
  public cpuData: BehaviorSubject<ChartPoint>;

  constructor() {
    this.cpuData = new BehaviorSubject(new ChartPoint(50));

    this.socket = socketio('http://127.0.0.1:8012/');
    this.socket.on('connect', () => {
      console.log('connected');
    });
    this.socket.on('disconnect', () => {
      console.log('disconnected');
    });
    this.socket.on('deliver', (data) => {
      console.log(Object.values(data));
      this.cpuData.next({date: new Date(), value: data[0].cpu.value * 100 });
    });
  }
}
