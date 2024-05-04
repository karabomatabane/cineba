import { Component, Input, OnInit } from '@angular/core';
import { ViewList } from 'src/app/_models/list.model';

@Component({
  selector: 'app-view-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
  @Input() viewLists: ViewList[] = [];
  searchText: string = '';
  onlyByMe: boolean = false;
  sortBy: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  create() {
    console.log('create')
  }

  searchList() {
    console.log('search list')
  }
}
