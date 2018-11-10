import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MetricDisplayComponent } from './metric-display.component';

describe('MetricDisplayComponent', () => {
  let component: MetricDisplayComponent;
  let fixture: ComponentFixture<MetricDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MetricDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetricDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
