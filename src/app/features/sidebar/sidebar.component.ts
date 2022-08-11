import { Component, OnInit } from '@angular/core';
import { TagsService } from 'src/app/core/services/tags.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.less'],
})
export class SidebarComponent implements OnInit {
  constructor(public tags: TagsService) {}

  ngOnInit(): void {}
}
