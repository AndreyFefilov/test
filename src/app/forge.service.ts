import { Injectable } from '@angular/core';
import { AggregatedView } from './aggregated-view';

Injectable()
export class ForgeService {
  aggregatedView: AggregatedView;

  constructor() {
    this.aggregatedView = new AggregatedView();
  }
}
