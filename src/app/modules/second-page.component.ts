import { Component } from '@angular/core';
import { ForgeService } from '../forge.service';

@Component({
  selector: 'second',
  templateUrl: 'second-page.component.html'
})
export class SecondPageComponent {
  constructor(private forgeService: ForgeService) {
  }
}
