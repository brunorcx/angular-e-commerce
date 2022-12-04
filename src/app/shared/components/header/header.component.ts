import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less'],
})
export class HeaderComponent implements OnInit {
  open: boolean;
  constructor() {
    this.open = false;
  }

  ngOnInit(): void {}
  openHeader() {
    if (window.innerWidth < 959) {
      this.open = !this.open;
      (document.getElementById('toolbar') as HTMLDivElement).className = 'toolbar open';
      if (this.open) {
        (document.getElementById('toolbar') as HTMLDivElement).className = 'toolbar open';
        document.body.style.overflowY = 'hidden';
      } else {
        (document.getElementById('toolbar') as HTMLDivElement).className = 'toolbar';
        document.body.style.overflowY = 'auto';
      }
    }
  }
}
