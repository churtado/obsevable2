import { Runtime, Inspector } from '@observablehq/runtime';
import { Component, OnInit, AfterContentInit } from '@angular/core';
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
        // input
        case 'viewof button': return new Inspector(document.querySelector('#button'));
        case 'viewof applyButton': return new Inspector(document.querySelector('#applyButton'));
        case 'viewof sales_slider': return new Inspector(document.querySelector('#sales_slider'));
        case 'viewof profit_slider': return new Inspector(document.querySelector('#profit_slider'));
        case 'viewof start_date': return new Inspector(document.querySelector('#start_date'));
        case 'viewof end_date': return new Inspector(document.querySelector('#end_date'));

        // charts
        case 'viewof scatterplot': return new Inspector(document.querySelector('#scatterplot'));
        case 'viewof linechart': return new Inspector(document.querySelector('#linechart'));
        case 'viewof barchart': return new Inspector(document.querySelector('#barchart'));
        case 'viewof map': return new Inspector(document.querySelector('#map'));

        // appendix
        case 'createCrossfilter': return new Inspector(document.querySelector('#createCrossfilter'));
        case 'filterState': return new Inspector(document.querySelector('#filterState'));

        // crossfilter
        case 'catSubcatRegionCrossfilter': return new Inspector(document.querySelector('#catSubcatRegionCrossfilter'));
        case 'customerIdCrossfilter': return new Inspector(document.querySelector('#customerIdCrossfilter'));
        case 'orderDateCrossfilter': return new Inspector(document.querySelector('#orderDateCrossfilter'));
        case 'orderDateOverviewCrossfilter': return new Inspector(document.querySelector('#orderDateOverviewCrossfilter'));
        case 'stateIdCrossfilter': return new Inspector(document.querySelector('#stateIdCrossfilter'));

        // data
        case 'cat_subcat_region_data': return new Inspector(document.querySelector('#cat_subcat_region_data'));
        case 'customer_id_group_data': return new Inspector(document.querySelector('#customer_id_group_data'));
        case 'order_date_group_data': return new Inspector(document.querySelector('#order_date_group_data'));
        case 'order_date_group_data_overview': return new Inspector(document.querySelector('#order_date_group_data_overview'));
        case 'state_id_date_group_data': return new Inspector(document.querySelector('#state_id_date_group_data'));
        case 'superstore': return new Inspector(document.querySelector('#superstore'));

        // selections
        case 'flag_furniture_selected': return new Inspector(document.querySelector('#flag_furniture_selected'));
        case 'flag_office_supplies_selected': return new Inspector(document.querySelector('#flag_office_supplies_selected'));
        case 'flag_technology_selected': return new Inspector(document.querySelector('#flag_technology_selected'));
        case 'selected_categories': return new Inspector(document.querySelector('#selected_categories'));
        case 'selected_categories_pre': return new Inspector(document.querySelector('#selected_categories_pre'));
        case 'selected_customers': return new Inspector(document.querySelector('#selected_customers'));
        case 'selected_customers_pre': return new Inspector(document.querySelector('#selected_customers_pre'));
        case 'selected_dates': return new Inspector(document.querySelector('#selected_dates'));
        case 'selected_date_range': return new Inspector(document.querySelector('#selected_date_range'));
        case 'selected_dates_pre': return new Inspector(document.querySelector('#selected_dates_pre'));
        case 'selected_regions_pre': return new Inspector(document.querySelector('#selected_regions_pre'));
        case 'selected_regions': return new Inspector(document.querySelector('#selected_regions'));
        case 'selected_regions_furniture': return new Inspector(document.querySelector('#selected_regions_furniture'));
        case 'selected_regions_office_supplies': return new Inspector(document.querySelector('#selected_regions_office_supplies'));
        case 'selected_regions_technology': return new Inspector(document.querySelector('#selected_regions_technology'));
        case 'selected_state_ids': return new Inspector(document.querySelector('#selected_state_ids'));
        case 'selected_state_ids_pre': return new Inspector(document.querySelector('#selected_state_ids_pre'));
        case 'selected_subcategories': return new Inspector(document.querySelector('#selected_subcategories'));
        case 'selected_subcategories_pre': return new Inspector(document.querySelector('#selected_subcategories_pre'));
        case 'selected_subcategories_furniture': return new Inspector(document.querySelector('#selected_subcategories_furniture'));
        case 'selected_subcategories_office_supplies': return new Inspector(document.querySelector('#selected_subcategories_office_supplies'));
        case 'selected_subcategories_technology': return new Inspector(document.querySelector('#selected_subcategories_technology'));

        // signals
        case 'signal_bar_furniture': return new Inspector(document.querySelector('#createSlider'));
        case 'signal_bar_office_supplies': return new Inspector(document.querySelector('#createSlider'));
        case 'signal_bar_technology': return new Inspector(document.querySelector('#createSlider'));
        case 'signal_line': return new Inspector(document.querySelector('#createSlider'));
        case 'signal_map': return new Inspector(document.querySelector('#createSlider'));
        case 'signal_scatter': return new Inspector(document.querySelector('#createSlider'));

        // utilities
        case 'sliderCss': return new Inspector(document.querySelector('#sliderCss'));
        case 'createSlider': return new Inspector(document.querySelector('#createSlider'));
        case 'date': return new Inspector(document.querySelector('#date'));
        case 'input': return new Inspector(document.querySelector('#input'));
        case 'log': return new Inspector(document.querySelector('#log'));
      }
    });
  }
}
