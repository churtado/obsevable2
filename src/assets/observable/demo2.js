// https://observablehq.com/@churtado/tableau-0-7-1@4944
export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# Tableau 0.7.1`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## Input`
)});
  main.variable(observer("viewof button")).define("viewof button", ["html","mutable selected_categories","mutable selected_customers","mutable selected_dates","mutable selected_regions","mutable selected_subcategories","mutable filterState"], function(html,$0,$1,$2,$3,$4,$5)
{
  const form = html`<form><button name=button>Reset Filters`;
  form.button.onclick = event => {
    event.preventDefault(); // Don’t submit the form.
    $0.value = [];
    $1.value = [];
    $2.value = [];
    $3.value = [];
    $4.value = [];
    $5.value = {
      customers: [],
      dates: [],
      categories: [],
      subcategories: [],
      regions: [],
      states: []
    }
  };
  return form;
}
);
  main.variable(observer("button")).define("button", ["Generators", "viewof button"], (G, _) => G.input(_));
  main.variable(observer("viewof applyButton")).define("viewof applyButton", ["html","mutable selected_customers","selected_customers_pre","mutable selected_state_ids","selected_state_ids_pre","mutable selected_regions","selected_regions_pre","mutable selected_subcategories","selected_subcategories_pre","mutable selected_categories","selected_categories_pre","start_date","end_date","moment","mutable selected_dates","orderDateCrossfilter","selected_dates_pre"], function(html,$0,selected_customers_pre,$1,selected_state_ids_pre,$2,selected_regions_pre,$3,selected_subcategories_pre,$4,selected_categories_pre,start_date,end_date,moment,$5,orderDateCrossfilter,selected_dates_pre)
{
  const form = html`<form><button name=button>Apply Filters`;
  form.button.onclick = event => {
    event.preventDefault(); // Don’t submit the form.
    $0.value = selected_customers_pre;
    $1.value = selected_state_ids_pre;
    $2.value = selected_regions_pre;
    $3.value = selected_subcategories_pre;
    $4.value = selected_categories_pre;
    
    debugger;
    
    // did the user enter a date manually?
    if(start_date !== "" || end_date !== "") {
      
      // did the user enter only the start date?
      if(start_date !== "" && end_date === "") {
        let d1 = moment(start_date).unix() * 1000;
        $5.value = orderDateCrossfilter.allMembers.filter(e => {
          return e.order_date >= d1 
        }).map(e => {
          return e.order_date
        }) 
      }
      
      // did the user enter only the end date?
      if(start_date === "" && end_date !== "") {
        let d2 = moment(end_date).unix() * 1000;
        $5.value = orderDateCrossfilter.allMembers.filter(e => {
          return e.order_date <= d2
        }).map(e => {
          return e.order_date
        }) 
      }
      
      // did the user enter both?
      if(start_date !== "" && end_date !== "") {
        let d1 = moment(start_date).unix() * 1000;
        let d2 = moment(end_date).unix() * 1000;
        $5.value = orderDateCrossfilter.allMembers.filter(e => {
          return e.order_date >= d1 && e.order_date <= d2
        }).map(e => {
          return e.order_date
        }) 
      }
    } else {
      // the user entered no dates
      $5.value = selected_dates_pre;
    }
    
  };
  return form;
}
);
  main.variable(observer("applyButton")).define("applyButton", ["Generators", "viewof applyButton"], (G, _) => G.input(_));
  main.variable(observer("viewof sales_slider")).define("viewof sales_slider", ["createSlider"], function(createSlider){return(
createSlider({
  domain: {min: 0, max: 25000},
  range: {min: -5, max: 25000},
  maxWidth: 250,
  minSliderWidth: 30,
  height: 30
})
)});
  main.variable(observer("sales_slider")).define("sales_slider", ["Generators", "viewof sales_slider"], (G, _) => G.input(_));
  main.variable(observer("viewof profit_slider")).define("viewof profit_slider", ["createSlider"], function(createSlider){return(
createSlider({
  domain: {min: -8000, max: 10000},
  range: {min: -8000, max: 10000},
  maxWidth: 250,
  minSliderWidth: 30,
  height: 30
})
)});
  main.variable(observer("profit_slider")).define("profit_slider", ["Generators", "viewof profit_slider"], (G, _) => G.input(_));
  main.variable(observer("viewof start_date")).define("viewof start_date", ["date"], function(date){return(
date({
  title: "Start date", 
  min: "2016-01-01",
  max: "2018-12-31",
  //value: "2017-01-01",
  description: "Filter by order date"
})
)});
  main.variable(observer("start_date")).define("start_date", ["Generators", "viewof start_date"], (G, _) => G.input(_));
  main.variable(observer("viewof end_date")).define("viewof end_date", ["date"], function(date){return(
date({
  title: "End date", 
  min: "2016-01-01",
  max: "2018-12-31",
  //value: "2017-01-01",
  description: "Filter by order date"
})
)});
  main.variable(observer("end_date")).define("end_date", ["Generators", "viewof end_date"], (G, _) => G.input(_));
  main.variable(observer("viewof scatterplot")).define("viewof scatterplot", ["vega","customer_id_group_data","sales_slider","profit_slider"], function(vega,customer_id_group_data,sales_slider,profit_slider){return(
vega({
  "$schema": "https://vega.github.io/schema/vega-lite/v3.json", 
  "hconcat": [
    {
      "width": 270,
      "height": 300,
      "data": { "values": customer_id_group_data  },
      "selection": {
        "brush": { "type": "interval"},
        "customer_id": {
          "type": "multi", 
          "fields": ["customer_id"],
          "on": "mouseover",
        }
      },
      "mark": {"type": "circle", "clip": true},
      "encoding": {
        "x": {
          "field": "sales",
          "type": "quantitative", 
          "scale": {"type": "linear", "domain": [sales_slider.range.min, sales_slider.range.max]}
        },
        "y": {
          "field": "profit",
          "type": "quantitative",
          "scale": {"domain": [profit_slider.range.min, profit_slider.range.max]}
        },
        "detail": {"field": "customer_id", "type": "nominal"},
          "color": {
            "field": "profit", 
            "type": "quantitative",
            "scale": {     
              "range": ["#7b3014","#d04a07","#f98c40","#c8c9ca","#5aa5cd","#236ca7","#26456e"]
            }
          }
        }
    },
    {
      "width": 270,
      "height": 300,
      "data": { "values": customer_id_group_data  },
      "selection": {
        "grid": {
          "type": "interval", "bind": "scales"
        }
      },
      "mark": {"type": "circle", "clip": true},
      "encoding": {
        "x": {
          "field": "sales",
          "type": "quantitative",
        },
        "y": {
          "field": "profit",
          "type": "quantitative"
        },
        "detail": {"field": "customer_id", "type": "nominal"},
          "color": {
            "field": "profit", 
            "type": "quantitative",
            "scale": {     
              "range": ["#7b3014","#d04a07","#f98c40","#c8c9ca","#5aa5cd","#236ca7","#26456e"]
            }
          }
        }
    }
  ]
  
})
)});
  main.variable(observer("scatterplot")).define("scatterplot", ["Generators", "viewof scatterplot"], (G, _) => G.input(_));
  main.variable(observer("viewof linechart")).define("viewof linechart", ["vega","order_date_group_data"], function(vega,order_date_group_data){return(
vega({
  "$schema": "https://vega.github.io/schema/vega-lite/v3.json",
  
  "data": { "values": order_date_group_data },
  "vconcat": [
    {
      "width": 600,
      "height": 100,
      "mark": "area",
      "selection": {
        "brush": {"type": "interval", "encodings": ["x"]},
        "brushY": {"type": "interval", "encodings": ["y"]}
      },
      "encoding": {
        "x": {
          "field": "order_date", 
          "type": "temporal",
          "format": "milliseconds",
          "axis": {"title": ""}
        },
        "y": {
          "field": "sales",
          "type": "quantitative",
          "axis": {"tickCount": 3, "grid": false}
        }
      }
    },
    {
      "width": 600,
      "height": 300,
      "mark": "line",
      "encoding": {
        "x": {
          "field": "order_date", 
          "type": "temporal",
          "format": "milliseconds",
          "scale": {"domain": {"selection": "brush"}}
        },
        "y": {
          "field": "sales",
          "type": "quantitative",
          "scale": {"domain": {"selection": "brushY"}}
        }
      }
    }
  ]
  
})
)});
  main.variable(observer("linechart")).define("linechart", ["Generators", "viewof linechart"], (G, _) => G.input(_));
  main.variable(observer("viewof barchart")).define("viewof barchart", ["vega","cat_subcat_region_data"], function(vega,cat_subcat_region_data){return(
vega({
  "$schema": "https://vega.github.io/schema/vega-lite/v3.json",
  "data": { "values": cat_subcat_region_data },

  "vconcat": [
    {
      "width": 150,
      "height": 80,
      "transform": [
        {"filter": {"field": "category", "equal": "Furniture"}}
      ],
      "selection": {
        "highlight": {"type": "single", "empty": "none", "on": "mouseover"},
        "Furniture": {"type": "multi", "fields": ["subcategory", "region"]}
      },
      "mark": {
        "type": "bar",
        "fill": "#4C78A8",
        "stroke": "black",
        "cursor": "pointer"
      },
      "encoding": {
        "x": {"aggregate": "sum", "field": "sales", "type": "quantitative", "title": null},
        "y": {"field": "subcategory", "type": "nominal", "sort": {"encoding": "x"}, "title": null},
        "fillOpacity": {
          "condition": {"selection": "Furniture", "value": 1},
          "value": 0.3
        },
        "strokeWidth": {
          "condition": [
            {
              "test": {
                "and": [
                  {"selection": "Furniture"},
                  "length(data(\"Furniture_store\"))"
                ]
              },
              "value": 2
            },
            {"selection": "highlight", "value": 1}
          ],
          "value": 0
        },
        "column": {"field": "region", "type": "nominal"}
      }
    },
    {
      "width": 150,
      "height": 80,
      "transform": [
        {"filter": {"field": "category", "equal": "Technology"}}
      ],
      "selection": {
        "highlight": {"type": "single", "empty": "none", "on": "mouseover"},
        "Technology": {"type": "multi", "fields": ["subcategory", "region"]}
      },
      "mark": {
        "type": "bar",
        "fill": "#4C78A8",
        "stroke": "black",
        "cursor": "pointer"
      },
      "encoding": {
        "x": {"aggregate": "sum", "field": "sales", "type": "quantitative", "title": null},
        "y": {"field": "subcategory", "type": "nominal", "sort": {"encoding": "x"}},
        "fillOpacity": {
          "condition": {"selection": "Technology", "value": 1},
          "value": 0.3
        },
        "strokeWidth": {
          "condition": [
            {
              "test": {
                "and": [
                  {"selection": "Technology"},
                  "length(data(\"Technology_store\"))"
                ]
              },
              "value": 2
            },
            {"selection": "highlight", "value": 1}
          ],
          "value": 0
        },
        "column": {"field": "region", "type": "nominal", "title": null, "header": {labelColor: "white"} }
      }
    },
    {
      "width": 150,
      "height": 140,
      "transform": [
        {"filter": {"field": "category", "equal": "Office Supplies"}}
      ],
      "selection": {
        "highlight": {"type": "single", "empty": "none", "on": "mouseover"},
        "Office_Supplies": {"type": "multi", "fields": ["subcategory", "region"]}
      },
      "mark": {
        "type": "bar",
        "fill": "#4C78A8",
        "stroke": "black",
        "cursor": "pointer"
      },
      "encoding": {
        "x": {"aggregate": "sum", "field": "sales", "type": "quantitative"},
        "y": {"field": "subcategory", "type": "nominal", "sort": {"encoding": "x"}, "title": null},
        "fillOpacity": {
          "condition": {"selection": "Office_Supplies", "value": 1},
          "value": 0.3
        },
        "strokeWidth": {
          "condition": [
            {
              "test": {
                "and": [
                  {"selection": "Office_Supplies"},
                  "length(data(\"Office_Supplies_store\"))"
                ]
              },
              "value": 2
            },
            {"selection": "highlight", "value": 1}
          ],
          "value": 0
        },
        "column": {"field": "region", "type": "nominal", "title": null, "header": {labelColor: "white"}}
      }
    }
  ]
  
})
)});
  main.variable(observer("barchart")).define("barchart", ["Generators", "viewof barchart"], (G, _) => G.input(_));
  main.variable(observer("viewof map")).define("viewof map", ["vega","state_id_date_group_data"], function(vega,state_id_date_group_data){return(
vega({
  "$schema": "https://vega.github.io/schema/vega-lite/v3.json",
  "description": "Line drawn between airports in the U.S. simulating a flight itinerary",
  "width": 400,
  "height": 340,
  "data": {
    "url": "https://raw.githubusercontent.com/churtado/vega-datasets/gh-pages/data/us-10m.json",
    "format": {
      "type": "topojson",
      "feature": "states"
    }
  },
  "transform": [{
    "lookup": "id",
    "from": {
      "data": {
        "values": state_id_date_group_data 
      },
      "key": "state_id",
      "fields": ["profit"]
    }
  }],
  "selection": {
    "state": {"type": "multi", "fields": ["id"]}
  },
  "projection": {
    "type": "albersUsa"
  },
  "mark":"geoshape",
  "encoding": {
    "color": {
      "field": "profit",
      "type": "quantitative"
    }
  }
})
)});
  main.variable(observer("map")).define("map", ["Generators", "viewof map"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], function(md){return(
md`# Appendix`
)});
  main.variable(observer("createCrossfilter")).define("createCrossfilter", ["log","superstore","crossfilter"], function(log,superstore,crossfilter){return(
(groupKey, filterValueMap, mapper, customDimensionFunction) => {
  debugger;
  log('Loading data.');
  const data = superstore;
  
  log('Setting up dimensions');
  const dimensionList = [
    "customer_id",
    "state_id",
    "state",
    "category",
    "subcategory",
    "region",
    "segment",
    "order_date"
  ];
  
  log('Setting up filter values');
  const filterValueList = [
    "selected_customer_ids",
    "selected_dates"
  ]
     
  const cf = crossfilter(data);
  
  log('Crossfilter created, setting up dimensions and filters.');
  const dimensions = {};
  let groupDimension = {};
  
  log('Setting up reducers.');
  const reducers = {
    reduceAdd: (p, v) => {
      return {
        sales: p.sales + v.sales, profit: p.profit + v.profit 
      };
    },
    reduceRemove: (p, v) => {
      return {sales: p.sales - v.sales, profit: p.profit - v.profit };
    },
    reduceInitial: () =>  {
      return {sales: 0, profit: 0};
    }
  };
  
  log('Setting up dimensions');
  dimensionList.forEach((dimension) => {
    // create the dimension object for filtering
    // create a dimension for every item except that equal to groupKey
    let d = cf.dimension((d) => { return d[dimension] });
    if(dimension !== groupKey){
      dimensions[dimension] = d;
    } else {
      groupDimension = d;
    } 
  });

  // in this case a dimension isn't a simple field but a composite of several
  // the user needs to pass the function to generate the dimension member
  // and the dimension will be created from it
  if(customDimensionFunction) {
    groupDimension = //cf.dimension(customDimensionFunction);
    cf.dimension(function(d) { 
      return JSON.stringify ( { category: d.category , subcategory: d.subcategory, region: d.region } ) ;
    });
  }
  
  // filter for every dimension
  // generate the group and reduce it
  // map the output to whatever's desired
  const getGroup = () => {
    
    debugger;
    
    // apply every filter to every dimension
    dimensionList.forEach( dimension => {
      let values = filterValueMap[dimension];
      // are there values to filter?
      if(values !== undefined && values.length > 0 && dimension != groupKey){
        dimensions[dimension].filterFunction((d) => {
          return values.indexOf(d) >= 0;
        })
      } 
    })
    
    // generate the group
    let group = groupDimension.group();
    // apply the reducer to the group
    let reduced = group.reduce(reducers.reduceAdd, reducers.reduceRemove, reducers.reduceInitial);
    // apply the mapper to the reduced group
    let result = reduced.all().map(mapper);
    return result;
  }
  
  // this entire section is for capturing data from the signal,
  // filtering data by the capture, and returning the filtered set
  log('Setting up all members.');
  const allMembers = groupDimension.group()
    .reduce(reducers.reduceAdd, reducers.reduceRemove, reducers.reduceInitial)
    .top(Infinity)
    .map(mapper);
  
  return {
    key: ""+groupKey,
    crossfilter: cf,
    dimensionList: dimensionList.filter(e => { return e !== groupKey}),
    groupDimension: groupDimension,
    dimensions: dimensions,
    filterValues: filterValueMap,
    reducers: reducers,
    mapper: mapper,
    getGroup: getGroup,
    allMembers: allMembers
  };
}
)});
  main.define("initial filterState", ["selected_customers_pre","selected_date_range","selected_categories_pre","selected_subcategories_pre","selected_regions_pre","selected_state_ids_pre"], function(selected_customers_pre,selected_date_range,selected_categories_pre,selected_subcategories_pre,selected_regions_pre,selected_state_ids_pre)
{
  return {
    customer_ids: selected_customers_pre,
    dates: selected_date_range,
    categories: selected_categories_pre,
    subcategories: selected_subcategories_pre,
    regions: selected_regions_pre,
    states: selected_state_ids_pre
  }
}
);
  main.variable(observer("mutable filterState")).define("mutable filterState", ["Mutable", "initial filterState"], (M, _) => new M(_));
  main.variable(observer("filterState")).define("filterState", ["mutable filterState"], _ => _.generator);
  main.variable(observer()).define(["md"], function(md){return(
md`## Crossfilter`
)});
  main.variable(observer("catSubcatRegionCrossfilter")).define("catSubcatRegionCrossfilter", ["createCrossfilter","selected_customers","selected_dates","selected_state_ids"], function(createCrossfilter,selected_customers,selected_dates,selected_state_ids){return(
createCrossfilter(
  "cat_subcat_region_dimension",
  { 
    customer_id: selected_customers,
    order_date: selected_dates,
    state_id: selected_state_ids,
  },
  ({key: k, value: {sales: s, profit: p} }) => {
    let d = JSON.parse(k);
    return { category: d.category, region: d.region, subcategory: d.subcategory, sales: s, profit: p};
  },
  (d) => { 
    return JSON.stringify ( { category: d.category , subcategory: d.subcategory, region: d.region } ) ;
  }
)
)});
  main.variable(observer("customerIdCrossfilter")).define("customerIdCrossfilter", ["createCrossfilter","selected_dates","selected_categories","selected_regions","selected_subcategories","selected_state_ids"], function(createCrossfilter,selected_dates,selected_categories,selected_regions,selected_subcategories,selected_state_ids){return(
createCrossfilter(
  "customer_id",
  { 
    order_date: selected_dates,
    category: selected_categories,
    region: selected_regions,
    subcategory: selected_subcategories,
    state_id: selected_state_ids,
  },
  ({key: k, value: {sales: s, profit: p} }) => {
    return {"customer_id": k, sales: s, profit: p};
  }
)
)});
  main.variable(observer("orderDateCrossfilter")).define("orderDateCrossfilter", ["createCrossfilter","selected_customers","selected_categories","selected_regions","selected_subcategories","selected_state_ids","moment"], function(createCrossfilter,selected_customers,selected_categories,selected_regions,selected_subcategories,selected_state_ids,moment){return(
createCrossfilter(
  "order_date",
  { 
    customer_id: selected_customers,
    category: selected_categories,
    region: selected_regions,
    subcategory: selected_subcategories,
    state_id: selected_state_ids,
  },
  ({key: k, value: {sales: s, profit: p} }) => {
    return {"order_date": moment(k).unix()*1000, sales: s, profit: p};
  },
)
)});
  main.variable(observer("stateIdCrossfilter")).define("stateIdCrossfilter", ["createCrossfilter","selected_customers","selected_categories","selected_regions","selected_subcategories","selected_dates"], function(createCrossfilter,selected_customers,selected_categories,selected_regions,selected_subcategories,selected_dates){return(
createCrossfilter(
  "state_id",
  { 
    customer_id: selected_customers,
    category: selected_categories,
    region: selected_regions,
    subcategory: selected_subcategories,
    order_date: selected_dates,
  },
  ({key: k, value: {sales: s, profit: p} }) => {
    return {"state_id": k, sales: s, profit: p};
  },
)
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## Data`
)});
  main.variable(observer("cat_subcat_region_data")).define("cat_subcat_region_data", ["catSubcatRegionCrossfilter"], function(catSubcatRegionCrossfilter){return(
catSubcatRegionCrossfilter.getGroup()
)});
  main.variable(observer("customer_id_group_data")).define("customer_id_group_data", ["customerIdCrossfilter"], function(customerIdCrossfilter){return(
customerIdCrossfilter.getGroup()
)});
  main.variable(observer("order_date_group_data")).define("order_date_group_data", ["orderDateCrossfilter"], function(orderDateCrossfilter){return(
orderDateCrossfilter.getGroup()
)});
  main.variable(observer("state_id_date_group_data")).define("state_id_date_group_data", ["stateIdCrossfilter"], function(stateIdCrossfilter){return(
stateIdCrossfilter .getGroup()
)});
  main.variable(observer("superstore")).define("superstore", ["d3"], function(d3){return(
d3.json("https://raw.githubusercontent.com/churtado/superjson/master/superstore.json")
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## Libraries`
)});
  main.variable(observer("crossfilter")).define("crossfilter", ["require"], function(require){return(
require('https://bundle.run/crossfilter2@1.4.5')
)});
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require("https://d3js.org/d3.v5.js")
)});
  main.variable(observer("d3format")).define("d3format", ["require"], function(require){return(
require("d3-format@1")
)});
  main.variable(observer("vega")).define("vega", ["require"], async function(require)
{
  const v = window.vega = await require("vega@3");
  const vl = window.vl = await require("vega-lite@2");
  const ve = await require("vega-embed@3");
  async function vega(spec, options) {
    const div = document.createElement("div");
    div.value = (await ve(div, spec, options)).view;
    return div;
  }
  vega.changeset = v.changeset;
  return vega;
}
);
  main.variable(observer("moment")).define("moment", ["require"], function(require){return(
require('https://bundle.run/moment-timezone@0.5.14')
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## Selections`
)});
  main.define("initial flag_furniture_selected", function(){return(
""
)});
  main.variable(observer("mutable flag_furniture_selected")).define("mutable flag_furniture_selected", ["Mutable", "initial flag_furniture_selected"], (M, _) => new M(_));
  main.variable(observer("flag_furniture_selected")).define("flag_furniture_selected", ["mutable flag_furniture_selected"], _ => _.generator);
  main.define("initial flag_office_supplies_selected", function(){return(
""
)});
  main.variable(observer("mutable flag_office_supplies_selected")).define("mutable flag_office_supplies_selected", ["Mutable", "initial flag_office_supplies_selected"], (M, _) => new M(_));
  main.variable(observer("flag_office_supplies_selected")).define("flag_office_supplies_selected", ["mutable flag_office_supplies_selected"], _ => _.generator);
  main.define("initial flag_technology_selected", function(){return(
""
)});
  main.variable(observer("mutable flag_technology_selected")).define("mutable flag_technology_selected", ["Mutable", "initial flag_technology_selected"], (M, _) => new M(_));
  main.variable(observer("flag_technology_selected")).define("flag_technology_selected", ["mutable flag_technology_selected"], _ => _.generator);
  main.define("initial selected_categories", function(){return(
[]
)});
  main.variable(observer("mutable selected_categories")).define("mutable selected_categories", ["Mutable", "initial selected_categories"], (M, _) => new M(_));
  main.variable(observer("selected_categories")).define("selected_categories", ["mutable selected_categories"], _ => _.generator);
  main.define("initial selected_categories_pre", ["flag_furniture_selected","flag_office_supplies_selected","flag_technology_selected"], function(flag_furniture_selected,flag_office_supplies_selected,flag_technology_selected){return(
[
  flag_furniture_selected , flag_office_supplies_selected , flag_technology_selected 
].filter(e => e !== "")
)});
  main.variable(observer("mutable selected_categories_pre")).define("mutable selected_categories_pre", ["Mutable", "initial selected_categories_pre"], (M, _) => new M(_));
  main.variable(observer("selected_categories_pre")).define("selected_categories_pre", ["mutable selected_categories_pre"], _ => _.generator);
  main.define("initial selected_customers", function(){return(
[]
)});
  main.variable(observer("mutable selected_customers")).define("mutable selected_customers", ["Mutable", "initial selected_customers"], (M, _) => new M(_));
  main.variable(observer("selected_customers")).define("selected_customers", ["mutable selected_customers"], _ => _.generator);
  main.define("initial selected_customers_pre", function(){return(
[]
)});
  main.variable(observer("mutable selected_customers_pre")).define("mutable selected_customers_pre", ["Mutable", "initial selected_customers_pre"], (M, _) => new M(_));
  main.variable(observer("selected_customers_pre")).define("selected_customers_pre", ["mutable selected_customers_pre"], _ => _.generator);
  main.define("initial selected_dates", function(){return(
[]
)});
  main.variable(observer("mutable selected_dates")).define("mutable selected_dates", ["Mutable", "initial selected_dates"], (M, _) => new M(_));
  main.variable(observer("selected_dates")).define("selected_dates", ["mutable selected_dates"], _ => _.generator);
  main.define("initial selected_date_range", function(){return(
[]
)});
  main.variable(observer("mutable selected_date_range")).define("mutable selected_date_range", ["Mutable", "initial selected_date_range"], (M, _) => new M(_));
  main.variable(observer("selected_date_range")).define("selected_date_range", ["mutable selected_date_range"], _ => _.generator);
  main.define("initial selected_dates_pre", function(){return(
[]
)});
  main.variable(observer("mutable selected_dates_pre")).define("mutable selected_dates_pre", ["Mutable", "initial selected_dates_pre"], (M, _) => new M(_));
  main.variable(observer("selected_dates_pre")).define("selected_dates_pre", ["mutable selected_dates_pre"], _ => _.generator);
  main.define("initial selected_regions_pre", ["selected_regions_furniture","selected_regions_technology","selected_regions_office_supplies"], function(selected_regions_furniture,selected_regions_technology,selected_regions_office_supplies){return(
[...(new Set((selected_regions_furniture  || [])
  .concat(selected_regions_technology || [])
  .concat(selected_regions_office_supplies || [])))]
)});
  main.variable(observer("mutable selected_regions_pre")).define("mutable selected_regions_pre", ["Mutable", "initial selected_regions_pre"], (M, _) => new M(_));
  main.variable(observer("selected_regions_pre")).define("selected_regions_pre", ["mutable selected_regions_pre"], _ => _.generator);
  main.define("initial selected_regions", function(){return(
[]
)});
  main.variable(observer("mutable selected_regions")).define("mutable selected_regions", ["Mutable", "initial selected_regions"], (M, _) => new M(_));
  main.variable(observer("selected_regions")).define("selected_regions", ["mutable selected_regions"], _ => _.generator);
  main.define("initial selected_regions_furniture", function(){return(
[]
)});
  main.variable(observer("mutable selected_regions_furniture")).define("mutable selected_regions_furniture", ["Mutable", "initial selected_regions_furniture"], (M, _) => new M(_));
  main.variable(observer("selected_regions_furniture")).define("selected_regions_furniture", ["mutable selected_regions_furniture"], _ => _.generator);
  main.define("initial selected_regions_office_supplies", function(){return(
[]
)});
  main.variable(observer("mutable selected_regions_office_supplies")).define("mutable selected_regions_office_supplies", ["Mutable", "initial selected_regions_office_supplies"], (M, _) => new M(_));
  main.variable(observer("selected_regions_office_supplies")).define("selected_regions_office_supplies", ["mutable selected_regions_office_supplies"], _ => _.generator);
  main.define("initial selected_regions_technology", function(){return(
[]
)});
  main.variable(observer("mutable selected_regions_technology")).define("mutable selected_regions_technology", ["Mutable", "initial selected_regions_technology"], (M, _) => new M(_));
  main.variable(observer("selected_regions_technology")).define("selected_regions_technology", ["mutable selected_regions_technology"], _ => _.generator);
  main.define("initial selected_state_ids", function(){return(
[]
)});
  main.variable(observer("mutable selected_state_ids")).define("mutable selected_state_ids", ["Mutable", "initial selected_state_ids"], (M, _) => new M(_));
  main.variable(observer("selected_state_ids")).define("selected_state_ids", ["mutable selected_state_ids"], _ => _.generator);
  main.define("initial selected_state_ids_pre", function(){return(
[]
)});
  main.variable(observer("mutable selected_state_ids_pre")).define("mutable selected_state_ids_pre", ["Mutable", "initial selected_state_ids_pre"], (M, _) => new M(_));
  main.variable(observer("selected_state_ids_pre")).define("selected_state_ids_pre", ["mutable selected_state_ids_pre"], _ => _.generator);
  main.define("initial selected_subcategories", function(){return(
[]
)});
  main.variable(observer("mutable selected_subcategories")).define("mutable selected_subcategories", ["Mutable", "initial selected_subcategories"], (M, _) => new M(_));
  main.variable(observer("selected_subcategories")).define("selected_subcategories", ["mutable selected_subcategories"], _ => _.generator);
  main.define("initial selected_subcategories_pre", ["selected_subcategories_furniture","selected_subcategories_technology","selected_subcategories_office_supplies"], function(selected_subcategories_furniture,selected_subcategories_technology,selected_subcategories_office_supplies){return(
[...(new Set(
  (selected_subcategories_furniture || [])
  .concat(selected_subcategories_technology || [])
  .concat(selected_subcategories_office_supplies || [])))]
)});
  main.variable(observer("mutable selected_subcategories_pre")).define("mutable selected_subcategories_pre", ["Mutable", "initial selected_subcategories_pre"], (M, _) => new M(_));
  main.variable(observer("selected_subcategories_pre")).define("selected_subcategories_pre", ["mutable selected_subcategories_pre"], _ => _.generator);
  main.define("initial selected_subcategories_furniture", function(){return(
[]
)});
  main.variable(observer("mutable selected_subcategories_furniture")).define("mutable selected_subcategories_furniture", ["Mutable", "initial selected_subcategories_furniture"], (M, _) => new M(_));
  main.variable(observer("selected_subcategories_furniture")).define("selected_subcategories_furniture", ["mutable selected_subcategories_furniture"], _ => _.generator);
  main.define("initial selected_subcategories_office_supplies", function(){return(
[]
)});
  main.variable(observer("mutable selected_subcategories_office_supplies")).define("mutable selected_subcategories_office_supplies", ["Mutable", "initial selected_subcategories_office_supplies"], (M, _) => new M(_));
  main.variable(observer("selected_subcategories_office_supplies")).define("selected_subcategories_office_supplies", ["mutable selected_subcategories_office_supplies"], _ => _.generator);
  main.define("initial selected_subcategories_technology", function(){return(
[]
)});
  main.variable(observer("mutable selected_subcategories_technology")).define("mutable selected_subcategories_technology", ["Mutable", "initial selected_subcategories_technology"], (M, _) => new M(_));
  main.variable(observer("selected_subcategories_technology")).define("selected_subcategories_technology", ["mutable selected_subcategories_technology"], _ => _.generator);
  main.variable(observer()).define(["md"], function(md){return(
md`## Signals`
)});
  main.variable(observer("signal_bar_furniture")).define("signal_bar_furniture", ["Generators","mutable flag_furniture_selected","mutable selected_regions_furniture","mutable selected_subcategories_furniture","barchart"], function(Generators,$0,$1,$2,barchart){return(
Generators.observe(notify => {
  // Yield the input’s initial value.
  const barSelection = (name, value) => {
    if(value.region == undefined) {
      $0.value = "";
      $1.value = [];
      $2.value = [];
    } else {
      $0.value = "Furniture";
      $1.value = value.region;
      $2.value = value.subcategory;
    }
    notify(value);
  };
  // Using Vega's view api, add a signal listener to the signal
  barchart.addSignalListener("Furniture", barSelection);
  // When the generator is disposed, detach the event listener.
  return () => barchart.removeSignalListener("Furniture", barSelection);
})
)});
  main.variable(observer("signal_bar_office_supplies")).define("signal_bar_office_supplies", ["Generators","mutable flag_office_supplies_selected","mutable selected_regions_office_supplies","mutable selected_subcategories_office_supplies","barchart"], function(Generators,$0,$1,$2,barchart){return(
Generators.observe(notify => {
  // Yield the input’s initial value.
  const barSelection = (name, value) => {
    if(value.region == undefined){
      $0.value = "";
      $1.value = [];
      $2.value = [];
    } else {
      $0.value = "Office Supplies";
      $1.value = value.region;
      $2.value = value.subcategory;
    }
    notify(value);
  }
  // Using Vega's view api, add a signal listener to the signal
  barchart.addSignalListener("Office_Supplies", barSelection);
  // When the generator is disposed, detach the event listener.
  return () => barchart.removeSignalListener("barSelection", barSelection);
})
)});
  main.variable(observer("signal_bar_technology")).define("signal_bar_technology", ["Generators","mutable flag_technology_selected","mutable selected_regions_technology","mutable selected_subcategories_technology","barchart"], function(Generators,$0,$1,$2,barchart){return(
Generators.observe(notify => {
  // Yield the input’s initial value.
  const barSelection = (name, value) => {
    
    if(value.region == undefined){
      $0.value = "";
      $1.value = [];
      $2.value = [];
    } else {
      $0.value = "Technology";
      $1.value = value.region;
      $2.value = value.subcategory;
    }
    notify(value);
  }  
  // Using Vega's view api, add a signal listener to the signal
  barchart.addSignalListener("Technology", barSelection);
  // When the generator is disposed, detach the event listener.
  return () => { 
    barchart.removeSignalListener("barSelection", barSelection)
  };
})
)});
  main.variable(observer("signal_line")).define("signal_line", ["Generators","orderDateCrossfilter","mutable selected_dates_pre","mutable selected_date_range","linechart"], function(Generators,orderDateCrossfilter,$0,$1,linechart){return(
Generators.observe(notify => {
  // Yield the input’s initial value.
  
  const linechartSelection = (name, value) => {
    
    let selection = orderDateCrossfilter.allMembers.filter(e => {
      if(value.order_date){
        return e.order_date  >= value.order_date[0]  && e.order_date  < value.order_date[1] 
      }
    }).map(e =>{
      return e["order_date"]
    });
    
    // filter other data sets by this
    $0.value  = selection;
    $1.value  = value;
    notify(selection);
  }
  // Using Vega's view api, add a signal listener to the signal
  linechart.addSignalListener("brush", linechartSelection);
  // When the generator is disposed, detach the event listener.
  return () => linechart.removeSignalListener("brush", linechartSelection);
})
)});
  main.variable(observer("signal_map")).define("signal_map", ["Generators","mutable selected_state_ids","mutable selected_state_ids_pre","map"], function(Generators,$0,$1,map){return(
Generators.observe(notify => {
  // Yield the input’s initial value.
  const stateSelection = (name, value) => {
    if (value.id == undefined) {
      $0.value = []
    } else {
      $1.value = []= value.id;
    }
    
    notify(value);
  } 
  // Using Vega's view api, add a signal listener to the signal
  map.addSignalListener("state", stateSelection);
  // When the generator is disposed, detach the event listener.
  return () => map.removeSignalListener("state", stateSelection);
})
)});
  main.variable(observer("signal_scatter")).define("signal_scatter", ["Generators","log","customerIdCrossfilter","mutable selected_customers_pre","scatterplot"], function(Generators,log,customerIdCrossfilter,$0,scatterplot){return(
Generators.observe(notify => {
  
  log('Setting up reducers.');
  
  // Yield the input’s initial value.
  const scatterSelection = (name, value) => {
    
    let selection = customerIdCrossfilter.allMembers.filter(e => {
      if(value.sales){
        return e.sales  > value.sales[0]  && e.sales  < value.sales[1] &&
             e.profit > value.profit[0] && e.profit < value.profit[1]
      }
    }).map(e =>{
      return e["customer_id"]
    });
    
    $0.value = selection;
    
    notify(selection);
  }
  // Using Vega's view api, add a signal listener to the signal
  scatterplot.addSignalListener("brush", scatterSelection);
  // When the generator is disposed, detach the event listener.
  return () => scatterplot.removeSignalListener("brush", scatterSelection);
})
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## Utilities`
)});
  main.variable(observer("sliderCss")).define("sliderCss", ["html"], function(html){return(
html`
  <style>
    .d3slider {
      position: absolute;
      background: #bdbdbd;
      height: 130%;
      min-width: 5%;
      top: -15%;
      cursor: move;
      border-radius: 8px;
    }

    .d3slider .handle {
      position: absolute;
      height: 100%;
      width: 6px;
      border-radius: 3px;
    }

    .d3slider .EE {
      right: -3px;
      cursor: e-resize;
    }

    .d3slider .WW {
      cursor: w-resize;
      left: -3px;
    }

    .d3slider .EE, .d3slider .WW {
      top: 50%;
      margin-top: -10px;
    }

    .d3slider-box {
      height: 30px;
      border-radius: 8px;
      background-color: #f0f0f0;
    }
  </style>
`
)});
  main.variable(observer("createSlider")).define("createSlider", ["html","d3"], function(html,d3){return(
function createSlider(config = {}) {

  let {domain, range, maxWidth, minSliderWidth, height} = config
  height = height ? height : 20
  domain = domain ? domain : {min: 0, max: 10}
  minSliderWidth = minSliderWidth ? minSliderWidth : 10
  range = range ? range : {
    min: Math.ceil((domain.max - domain.min) * 0.33) + domain.min,
    max: Math.ceil((domain.max - domain.min) * 0.66) + domain.min
  }
  
  const sliderOutput = html`
    <div 
      style='${maxWidth && 'max-width:' + maxWidth + 'px; '}height:${height}px;'
    />
  `
  let sliderBoxContainer = d3.select(sliderOutput)
  
  const sliderBox = 
    sliderBoxContainer.append('div')
      .style('position', 'relative')
      .style('height', (height / 1.3) + 'px')
      .style('min-width', (minSliderWidth * 2) + 'px')
      .classed('d3slider-box', true)
  const slider =
    sliderBox.append('div')
      .classed('d3slider', true)
  const handleW = slider.append('div').classed('handle WW', true)
  const handleE = slider.append('div').classed('handle EE', true)
  
  /** Update the `left` and `width` attributes of `slider` based on `range` */
  const updateUIFromRange = range => {
    range.min = Math.max(range.min, domain.min)
    range.max = Math.min(range.max, domain.max)
    const conW = sliderBox.node().clientWidth
    const rangeW = range.max - range.min
    const slope = (conW - minSliderWidth) / (domain.max - domain.min)
    const uirangeW = minSliderWidth + rangeW * slope
    let ratio = (range.min - domain.min) / (domain.max - domain.min - rangeW)
    if (isNaN(ratio)) { ratio = 0 }
    const uirangeL = ratio * (conW - uirangeW)
    slider
      .style('left', uirangeL + 'px')
      .style('width', uirangeW + 'px')
  }

  /** Update the `range` based on the `left` and `width` attributes of `slider` */
  const updateRangeFromUI = () => {
    const uirangeL = parseFloat(slider.style('left'))
    const uirangeW = parseFloat(slider.style('width'))
    const conW = sliderBox.node().clientWidth
    const slope = (conW - minSliderWidth) / (domain.max - domain.min)
    const rangeW = (uirangeW - minSliderWidth) / slope
    const uislope = (conW === uirangeW) ? 0 :
      ((domain.max - domain.min - rangeW) / (conW - uirangeW))
    const rangeL = domain.min + uislope * uirangeL
    const range = {
      min: Math.round(rangeL),
      max: Math.round(rangeL + rangeW)
    }
    sliderOutput.value = {domain, range, updateUIFromRange}
    sliderOutput.dispatchEvent(new CustomEvent('input'))
  }
 
  const dragResizeE = d3.drag()
    .on('start', () => {
      d3.event.sourceEvent.stopPropagation()
      sliderOutput.dispatchEvent(new CustomEvent('resizeStart'))
    })
    .on('end', () => {
      d3.event.sourceEvent.stopPropagation()
      sliderOutput.dispatchEvent(new CustomEvent('resizeEnd'))
    })
    .on('drag', () => {
      const dx = d3.event.dx
      if (dx === 0) return;
      const conWidth = sliderBox.node().clientWidth
      const newLeft = parseInt(slider.style('left'))
      let newWidth = parseFloat(slider.style('width')) + dx
      newWidth = Math.max(newWidth, minSliderWidth)
      newWidth = Math.min(newWidth, conWidth - newLeft)
      slider.style('width', newWidth + 'px')
      updateRangeFromUI()
    })
  handleE.call(dragResizeE)

  let startX
  const dragResizeW = d3.drag()
    .on('start', () => {
      startX = d3.event.x
      d3.event.sourceEvent.stopPropagation()
      sliderOutput.dispatchEvent(new CustomEvent('resizeStart'))
    })
    .on('end', () => {
      d3.event.sourceEvent.stopPropagation()
      sliderOutput.dispatchEvent(new CustomEvent('resizeEnd'))
    })
    .on('drag', () => {
      const dx = d3.event.x - startX
      if (dx === 0) return;
      let newLeft = parseFloat(slider.style('left')) + dx
      let newWidth = parseFloat(slider.style('width')) - dx
      if (newLeft < 0) { newWidth += newLeft; newLeft = 0 }
      if (newWidth < minSliderWidth) {
        newLeft -= minSliderWidth - newWidth
        newWidth = minSliderWidth
      }
      slider.style('left', newLeft + 'px')
      slider.style('width', newWidth + 'px')
      updateRangeFromUI()
    })
  handleW.call(dragResizeW)

  const dragMove = d3.drag()
    .on('start', () => {
      d3.event.sourceEvent.stopPropagation()
      sliderOutput.dispatchEvent(new CustomEvent('dragStart'))
    })
    .on('end', () => {
      d3.event.sourceEvent.stopPropagation()
      sliderOutput.dispatchEvent(new CustomEvent('dragEnd'))
    })
    .on('drag', () => {
      const dx = d3.event.dx
      const conWidth = sliderBox.node().clientWidth
      let newLeft = parseInt(slider.style('left')) + dx
      let newWidth = parseInt(slider.style('width'))
      newLeft = Math.max(newLeft, 0)
      newLeft = Math.min(newLeft, conWidth - newWidth)
      slider.style('left', newLeft + 'px')
      updateRangeFromUI()
    })
  slider.call(dragMove)

  sliderBoxContainer.on('mousedown', () => {
    const x = d3.mouse(sliderBox.node())[0]
    let props = {}
    const sliderWidth = parseFloat(slider.style('width'))
    const conWidth = sliderBox.node().clientWidth
    props.left = Math.min(conWidth - sliderWidth, Math.max(x - sliderWidth / 2, 0))
    props.left = Math.round(props.left)
    props.width = Math.round(props.width)
    slider.style('left', props.left + 'px')
      .style('width', props.width + 'px') 
    updateRangeFromUI()
    sliderOutput.dispatchEvent(new CustomEvent('dragEnd'))
  })

  //Reposition slider on window resize
  window.addEventListener('resize', () => {
    updateUIFromRange(range)
  })

  updateUIFromRange(range)
  sliderOutput.value = {domain, range, updateUIFromRange}
  sliderOutput.dispatchEvent(new CustomEvent('input'))
  
  return sliderOutput  
}
)});
  main.variable(observer("date")).define("date", ["input"], function(input){return(
function date(config = {}) {
  let {min, max, value, title, description, display} = config;
  if (typeof config == "string") value = config;
  return input({
    type: "date", title, description, display,
    attributes: {min, max, value}
  });
}
)});
  main.variable(observer("input")).define("input", ["html","d3format"], function(html,d3format){return(
function input(config) {
  let {
    form,
    type = "text",
    attributes = {},
    action,
    getValue,
    title,
    description,
    format,
    display,
    submit,
    options
  } = config;
  const wrapper = html`<div></div>`;
  if (!form)
    form = html`<form>
	<input name=input type=${type} />
  </form>`;
  Object.keys(attributes).forEach(key => {
    const val = attributes[key];
    if (val != null) form.input.setAttribute(key, val);
  });
  if (submit)
    form.append(
      html`<input name=submit type=submit style="margin: 0 0.75em" value="${
        typeof submit == "string" ? submit : "Submit"
      }" />`
    );
  form.append(
    html`<output name=output style="font: 14px Menlo, Consolas, monospace; margin-left: 0.5em;"></output>`
  );
  if (title)
    form.prepend(
      html`<div style="font: 700 0.9rem sans-serif;">${title}</div>`
    );
  if (description)
    form.append(
      html`<div style="font-size: 0.85rem; font-style: italic;">${description}</div>`
    );
  if (format) format = typeof format === "function" ? format : d3format.format(format);
  if (action) {
    action(form);
  } else {
    const verb = submit
      ? "onsubmit"
      : type == "button"
      ? "onclick"
      : type == "checkbox" || type == "radio"
      ? "onchange"
      : "oninput";
    form[verb] = e => {
      e && e.preventDefault();
      const value = getValue ? getValue(form.input) : form.input.value;
      if (form.output) {
        const out = display ? display(value) : format ? format(value) : value;
        if (out instanceof window.Element) {
          while (form.output.hasChildNodes()) {
            form.output.removeChild(form.output.lastChild);
          }
          form.output.append(out);
        } else {
          form.output.value = out;
        }
      }
      form.value = value;
      if (verb !== "oninput")
        form.dispatchEvent(new CustomEvent("input", { bubbles: true }));
    };
    if (verb !== "oninput")
      wrapper.oninput = e => e && e.stopPropagation() && e.preventDefault();
    if (verb !== "onsubmit") form.onsubmit = e => e && e.preventDefault();
    form[verb]();
  }
  while (form.childNodes.length) {
    wrapper.appendChild(form.childNodes[0]);
  }
  form.append(wrapper);
  return form;
}
)});
  main.variable(observer("log")).define("log", function(){return(
function log(args) {
  let message = args
  if (Array.isArray(args)) { message = args.join(', ') }
  console.log(new Date().toISOString(), message)  
}
)});
  return main;
}