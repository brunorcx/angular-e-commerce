import { Component, OnInit } from '@angular/core';
import { TagsService } from 'src/app/core/services/tags.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.less'],
})
export class SidebarComponent implements OnInit {
  open: boolean;
  constructor(public tags: TagsService) {
    this.open = false;
  }

  ngOnInit(): void {}
  openSidebar() {
    if (window.innerWidth < 959) {
      this.open = !this.open;
      if (this.open) {
        (document.getElementById('sidebar') as HTMLDivElement).className = 'sidebar open';
        document.body.style.overflowY = 'hidden';
      } else {
        (document.getElementById('sidebar') as HTMLDivElement).className = 'sidebar';
        document.body.style.overflowY = 'auto';
      }
    }
  }
}
