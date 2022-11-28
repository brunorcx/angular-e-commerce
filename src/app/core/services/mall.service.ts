import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MallService {
  constructor() {
    this.mall = [];
  }
  private mall: string[];

  public getMall(): string[] {
    return this.mall;
  }
  public setMall(mall: string[]) {
    this.mall = mall;
  }
}
