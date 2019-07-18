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
        
        case "barSelectionFurniture": return new Inspector(document.querySelector("#barSelectionFurniture"));
        case "barSelectionTechnology": return new Inspector(document.querySelector("#barSelectionTechnology"));
        case "barSelectionOfficeSupplies": return new Inspector(document.querySelector("#barSelectionOfficeSupplies"));

        case "stateSelection": return new Inspector(document.querySelector("#stateSelection"));
        case "scatterLeftIntervalSelection": return new Inspector(document.querySelector("#scatterLeftIntervalSelection"));
        case "lineSelection": return new Inspector(document.querySelector("#lineSelection"));

        case "selected_subcategories": return new Inspector(document.querySelector("#selected_subcategories"));
        case "selected_categories": return new Inspector(document.querySelector("#selected_categories"));
        case "selected_regions": return new Inspector(document.querySelector("#selected_regions"));

        case "furnitureSelected": return new Inspector(document.querySelector("#furnitureSelected"));
        case "furnitureRegions": return new Inspector(document.querySelector("#furnitureRegions"));
        case "furnitureSubcategories": return new Inspector(document.querySelector("#furnitureSubcategories"));

        case "technologySelected": return new Inspector(document.querySelector("#technologySelected"));
        case "technologyRegions": return new Inspector(document.querySelector("#technologyRegions"));
        case "technologySubcategories": return new Inspector(document.querySelector("#technologySubcategories"));

        case "officeSuppliesSelected": return new Inspector(document.querySelector("#officeSuppliesSelected"));
        case "officeSuppliesRegions": return new Inspector(document.querySelector("#officeSuppliesRegions"));
        case "officeSuppliesSubcategories": return new Inspector(document.querySelector("#officeSuppliesSubcategories"));

        case "selected_states": return new Inspector(document.querySelector("#selected_states"));
        case "selected_customers_left": return new Inspector(document.querySelector("#selected_customers_left"));
        case "selected_dates": return new Inspector(document.querySelector("#selected_dates"));

        case "ss": return new Inspector(document.querySelector("#ss"));
        case "createCrossfilter": return new Inspector(document.querySelector("#createCrossfilter"));
        case "dataStructure": return new Inspector(document.querySelector("#dataStructure"));
        case "filterGroupByDimensions": return new Inspector(document.querySelector("#filterGroupByDimensions"));

        case "cat_subcat_region_view": return new Inspector(document.querySelector("#cat_subcat_region_view"));
        case "customer_id_group_view_left": return new Inspector(document.querySelector("#customer_id_group_view_left"));
        case "customer_id_group_view_right": return new Inspector(document.querySelector("#customer_id_group_view_right"));
        case "state_group_view": return new Inspector(document.querySelector("#state_group_view"));
        case "order_date_group_view": return new Inspector(document.querySelector("#order_date_group_view"));
        
        case "randomVar": return new Inspector(document.querySelector("#randomVar"));
        case "updateRandomVar": return new Inspector(document.querySelector("#updateRandomVar"));
        
        
      }
    });
  }
}
