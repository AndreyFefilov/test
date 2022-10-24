import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private router: Router) {
  }

  title = 'test';
  nextPage = '';
  link = '';

  ngOnInit() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd),)
      .subscribe((event) => {
        if(event instanceof NavigationEnd ) {
          this.nextPage = event.urlAfterRedirects === '/home' ? 'Second page' : 'Home page';
          this.link = this.nextPage === 'Second page' ? '/second-page' : '/home';
        }
      })
  }

  goTo() {
    this.router.navigate([this.link]);
  }
}
