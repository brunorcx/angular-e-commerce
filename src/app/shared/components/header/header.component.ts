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
    this.open = !this.open;
    let el = document.getElementById('toolbar');
    if (el) {
      if (this.open) {
        el.className = 'toolbar open';
        document.body.style.overflow = 'hidden';
      } else {
        el.className = 'toolbar';
        document.body.style.overflow = 'auto';
      }
    }
  }
}
