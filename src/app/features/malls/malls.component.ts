import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MallService } from '../../core/services/mall.service';

@Component({
  selector: 'app-malls',
  templateUrl: './malls.component.html',
  styleUrls: ['./malls.component.less'],
})
export class MallsComponent implements OnInit {
  constructor(private http: HttpClient, private mallService: MallService) {}

  ngOnInit(): void {}
  filterByMall(mall: string[]) {
    this.mallService.setMall(mall);
  }
}
