import { Injectable } from '@angular/core';

export interface Tags extends Array<string> {
  [index: number]: string;
}

@Injectable({
  providedIn: 'root',
})
export class TagsService {
  constructor() {
    this.tags = [];
  }

  tags: Tags;

  getTags() {
    return this.tags;
  }
  setTags(tags: Tags) {
    console.log(tags);
    this.tags = tags;
  }
  addTag(tag: string) {
    this.tags.push(tag);
  }
}
