import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'second',
  templateUrl: 'second-page.component.html'
})
export class SecondPageComponent implements OnInit {
  ngOnInit() {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://developer.api.autodesk.com/modelderivative/v2/viewers/7.79/viewer3D.min.js';
    document.head.appendChild(script);
  }
}
