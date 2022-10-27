import { Injectable } from '@angular/core';
import type { AggregatedView } from './aggregated-view';

Injectable()
export class ForgeService {
  aggregatedView: AggregatedView | undefined;

  constructor() {
    import('./aggregated-view').then(module => {
      this.aggregatedView = new module.AggregatedView();
      console.log(this.aggregatedView);
    })
  }
}
