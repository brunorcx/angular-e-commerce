import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Tags extends Array<string> {
  [index: number]: string;
}

@Injectable({
  providedIn: 'root',
})
export class TagsService {
  constructor() {
    this.tags = [];
    this.selectedTags = [];
  }
  private currentTags = new BehaviorSubject(Array<string>());
  getCurrentTags = this.currentTags.asObservable();

  tags: Tags;
  selectedTags: string[];

  updateCurrentTags() {
    this.currentTags.next(this.selectedTags);
  }
  getTags(): Tags {
    return this.tags;
  }
  setTags(tags: Tags) {
    this.tags = tags;
  }
  addTag(tag: string) {
    this.tags.push(tag);
  }
  getSelectTags(): string[] {
    return this.selectedTags;
  }
  setSelectTags(selectedTags: string[]) {
    this.selectedTags = selectedTags;
  }
  filterTags(title: string, categoryRef: HTMLElement) {
    let duplicate = this.selectedTags.indexOf(title);
    if (duplicate !== -1) {
      categoryRef.style.color = 'whitesmoke';
      this.selectedTags.splice(duplicate, 1);
    } else {
      this.selectedTags.push(title);
      categoryRef.style.color = '#e4de87';
    }
    this.updateCurrentTags();
  }
}
