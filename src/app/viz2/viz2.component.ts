import { Runtime, Inspector } from "@observablehq/runtime";
import { Component, OnInit, ViewChild, ElementRef, AfterContentInit } from '@angular/core';
import notebook from '../../assets/observable/demo2';

@Component({
  selector: 'app-viz2',
  templateUrl: './viz2.component.html',
  styleUrls: ['./viz2.component.css']
})
export class Viz2Component implements OnInit, AfterContentInit {

  selection: any = [];
  observer: any = {};

  constructor() { }

  ngOnInit() {
  }

  ngAfterContentInit() {

    new Runtime().module(notebook, name => {
      switch (name) {
        // case 'viewof sales_slider': return new Inspector(document.querySelector("#sales_slider"));
        // case "viewof profit_slider": return new Inspector(document.querySelector("#profit_slider"));
        case "viewof map": return new Inspector(document.querySelector("#map"));
        case "viewof barchart": return new Inspector(document.querySelector("#barchart"));
        case "viewof scatterplot": return new Inspector(document.querySelector("#scatterplot"));
        case "viewof linechart": return new Inspector(document.querySelector("#linechart"));
        case "viewof linechart": return new Inspector(document.querySelector("#linechart"));
      }
    });
  }
}
