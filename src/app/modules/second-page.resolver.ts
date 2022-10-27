import { Injectable } from '@angular/core';
import { CanLoad } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class CanLoadSecondPage implements CanLoad {
  constructor() {}

  canLoad(): Observable<boolean> {
    return this.loadScript();
  }

  loadScript(): Observable<boolean> {
    return new Observable<boolean>(observer => {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = 'https://developer.api.autodesk.com/modelderivative/v2/viewers/7.79/viewer3D.min.js';
      document.head.appendChild(script);
      script.onload = () => {
        observer.next(true);
        observer.complete();
      };
    });
  }
}

