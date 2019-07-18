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
  observer: any = {}

  constructor() { }

  ngOnInit() {
  }

  ngAfterContentInit() {

    new Runtime().module(notebook, name => {
      const node = document.getElementById("popupview");
      switch (name) {
        case "viewof popslider3": return new Inspector(document.querySelector("#popslider3"));
        case "viewof popslider4": return new Inspector(document.querySelector("#popslider4"));
        case "facet1": return new Inspector(document.querySelector("#facet1"));
        case "viewof weatherSelect": return new Inspector(document.querySelector("#weatherSelect"));
        case "viewof popupView": return new Inspector(document.querySelector("#popupview"));
        case "selection": return {
          pending() { console.log(`${name} is running…`); },
          fulfilled(value) { 
            if(value.length === 0) {
              node.style.display="none";
            } else {
              node.style.display="block";
            }
            console.log(name, value); 
          },
          rejected(error) { console.error(error); }
        };
      }
    });
  }
}
