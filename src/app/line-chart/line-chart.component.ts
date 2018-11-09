import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Shape from 'd3-shape';
import * as d3Array from 'd3-array';
import * as d3Transition from 'd3-transition';
import * as d3Ease from 'd3-ease';

import { BehaviorSubject } from 'rxjs';
import { ChartPoint } from '../models/chartPoint';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {
  @Input() data: BehaviorSubject<ChartPoint> = new BehaviorSubject(new ChartPoint(0));

  public title = 'Line Chart';
  private chartData = [];

  private svg: any;
  private line: any;
  private x: any;
  private y: any;
  private lastData: any = new Date().getTime();
  private lastBeforeData: any = new Date().getTime();

  public width = 500;
  public height = 200;
  @Input() public chartTimeWidth = 10;

  @ViewChild('svg') svgElement: ElementRef;

  constructor() {
  }

  ngOnInit() {
    this.svg = d3.select(this.svgElement.nativeElement).append('g');
    this.x = d3Scale.scaleTime().range([0, this.width]);
    this.y = d3Scale.scaleLinear().range([this.height, 0]);
    this.setDomains();
    this.line = d3Shape.line().x( (d: any) => this.x(d.date) ).y( (d: any) => this.y(d.value) );
    this.svg.append('path').datum(this.chartData).attr('class', 'line').attr('d', this.line);

    this.data.subscribe((chartPoint: ChartPoint) => {
      this.lastBeforeData = this.lastData;
      this.lastData = new Date().getTime();
      this.redrawLine();
      this.chartData.push(chartPoint);
    });
  }

  setDomains() {
    this.x.domain(d3Array.extent([
      new Date().getTime() - this.chartTimeWidth * 1000,
      new Date().getTime() - (this.lastData - this.lastBeforeData) * 2
    ]));
    this.y.domain(d3Array.extent([0, 100]));
  }

  redrawLine() {
    this.setDomains();
    const tr = d3Transition.transition().ease(d3Ease.easeLinear).duration(this.lastData - this.lastBeforeData);
    this.svg.select('path').transition(tr).attr('d', this.line);
  }
}
