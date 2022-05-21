import { Component, Input, OnInit } from '@angular/core';
import { userNode } from './Models/node';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss'],
})
export class GraphComponent implements OnInit {
  @Input() treeNodes: userNode[] = [];

  constructor() {}

  ngOnInit() {

  }
}
