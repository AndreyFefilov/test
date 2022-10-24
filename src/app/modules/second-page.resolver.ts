import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class SecondPageResolver implements Resolve<boolean> {
  constructor() {}

  resolve(): Observable<boolean> {
    console.log('RESOLVE!');

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://developer.api.autodesk.com/modelderivative/v2/viewers/7.79/viewer3D.min.js';
    document.head.appendChild(script);

    const obs = new Observable<boolean>(observer => script.onload = () => {
      observer.next(true);
      observer.complete();
    });

    return obs;
  }
}

