// https://observablehq.com/@churtado/tableau-0-6-4@3430
export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# Tableau 0.6.4`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`# Charts`
)});
  main.variable(observer("viewof button")).define("viewof button", ["html","mutable furnitureSelected","mutable furnitureRegions","mutable furnitureSubcategories","mutable technologySelected","mutable technologyRegions","mutable technologySubcategories","mutable officeSuppliesSelected","mutable officeSuppliesRegions","mutable officeSuppliesSubcategories","mutable selected_customers_left"], function(html,$0,$1,$2,$3,$4,$5,$6,$7,$8,$9)
{
  const form = html`<form><button name=button>Reset Filters`;
  form.button.onclick = event => {
    event.preventDefault(); // Don’t submit the form.
    $0.value ="";
    $1.value = [];
    $2.value = [];
    $3.value ="";
    $4.value = [];
    $5.value = [];
    $6.value ="";
    $7.value = [];
    $8.value = [];
    $9.value = [];
  };
  return form;
}
);
  main.variable(observer("button")).define("button", ["Generators", "viewof button"], (G, _) => G.input(_));
  main.variable(observer("viewof sales_slider")).define("viewof sales_slider", ["createSlider"], function(createSlider){return(
createSlider({
  domain: {min: 0, max: 10000},
  range: {min: -5, max: 10000},
  maxWidth: 250,
  minSliderWidth: 30,
  height: 30
})
)});
  main.variable(observer("sales_slider")).define("sales_slider", ["Generators", "viewof sales_slider"], (G, _) => G.input(_));
  main.variable(observer("viewof profit_slider")).define("viewof profit_slider", ["createSlider"], function(createSlider){return(
createSlider({
  domain: {min: -3000, max: 4000},
  range: {min: -3000, max: 4000},
  maxWidth: 250,
  minSliderWidth: 30,
  height: 30
})
)});
  main.variable(observer("profit_slider")).define("profit_slider", ["Generators", "viewof profit_slider"], (G, _) => G.input(_));
  main.variable(observer("viewof scatterplot")).define("viewof scatterplot", ["vega","customer_id_group_view_left","sales_slider","profit_slider","customer_id_group_view_right"], function(vega,customer_id_group_view_left,sales_slider,profit_slider,customer_id_group_view_right){return(
vega({
  "$schema": "https://vega.github.io/schema/vega-lite/v3.json", 
  "hconcat": [
    {
      "width": 360,
      "height": 400,
      "data": { "values": customer_id_group_view_left  },
      "selection": {
        "brush_left": { "type": "interval"},
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
      "width": 360,
      "height": 400,
      "data": { "values": customer_id_group_view_right  },
      "mark": {"type": "circle", "clip": true},
      //"mark": {"type": "rect", "clip": true},
      "encoding": {
        "x": {
          //"bin": {"maxbins":60},
          "field": "sales",
          "type": "quantitative", 
          "scale": {"type": "linear", "domain": [sales_slider.range.min, sales_slider.range.max]}
        },
        "y": {
          //"bin": {"maxbins": 40},
          "field": "profit",
          "type": "quantitative",
          "scale": {"domain": [profit_slider.range.min, profit_slider.range.max]}
        },
        "detail": {"field": "customer_id", "type": "nominal"},
          "color": {
            "field": "profit", 
            "type": "quantitative",
            /*"scale": {     
              "range": ["#7b3014","#d04a07","#f98c40","#c8c9ca","#5aa5cd","#236ca7","#26456e"]
            }*/
          }
        }
    }
  ]
  
})
)});
  main.variable(observer("scatterplot")).define("scatterplot", ["Generators", "viewof scatterplot"], (G, _) => G.input(_));
  main.variable(observer("viewof linechart")).define("viewof linechart", ["vega","order_date_group_view"], function(vega,order_date_group_view){return(
vega({
  "$schema": "https://vega.github.io/schema/vega-lite/v3.json",
  
  "data": { "values": order_date_group_view },
  "vconcat": [
    {
      "width": 800,
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
      "width": 800,
      "height": 50,
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
  main.variable(observer("viewof map")).define("viewof map", ["vega","state_group_view"], function(vega,state_group_view){return(
vega({
  "$schema": "https://vega.github.io/schema/vega-lite/v3.json",
  "description": "Line drawn between airports in the U.S. simulating a flight itinerary",
  "width": 600,
  "height": 400,
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
        "values": state_group_view 
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
  main.variable(observer("viewof barchart")).define("viewof barchart", ["vega","cat_subcat_region_view"], function(vega,cat_subcat_region_view){return(
vega({
  "$schema": "https://vega.github.io/schema/vega-lite/v3.json",
  "data": { "values": cat_subcat_region_view },

  "vconcat": [
    {
      "width": 200,
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
      "width": 200,
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
      "width": 200,
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
  main.variable(observer()).define(["md"], function(md){return(
md`## Signals`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`### Bar Chart`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`#### Bar Chart`
)});
  main.variable(observer("barSelectionFurniture")).define("barSelectionFurniture", ["Generators","mutable furnitureSelected","mutable furnitureRegions","mutable furnitureSubcategories","barchart"], function(Generators,$0,$1,$2,barchart){return(
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
  main.variable(observer("barSelectionTechnology")).define("barSelectionTechnology", ["Generators","mutable technologySelected","mutable technologyRegions","mutable technologySubcategories","barchart"], function(Generators,$0,$1,$2,barchart){return(
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
  barchart.addSignalListener("Technology", barSelection);
  // When the generator is disposed, detach the event listener.
  return () => { 
    barchart.removeSignalListener("barSelection", barSelection)
  };
})
)});
  main.variable(observer("barSelectionOfficeSupplies")).define("barSelectionOfficeSupplies", ["Generators","mutable officeSuppliesSelected","mutable officeSuppliesRegions","mutable officeSuppliesSubcategories","barchart"], function(Generators,$0,$1,$2,barchart){return(
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
  main.variable(observer()).define(["md"], function(md){return(
md`### Map`
)});
  main.variable(observer("stateSelection")).define("stateSelection", ["Generators","mutable selected_states","tsv_state_names","map"], function(Generators,$0,tsv_state_names,map){return(
Generators.observe(notify => {
  // Yield the input’s initial value.
  const stateSelection = (name, value) => {
    //value = [{id:"0"}]
    if (value.id == undefined) {
      $0.value = []
    } else {
      $0.value = value.id.slice().map( e => {
         let s = tsv_state_names.filter(state => {
          return e == state.id;
        });
        return s[0].name;
      }).slice();
    }
    
    notify(value);
  } 
  // Using Vega's view api, add a signal listener to the signal
  map.addSignalListener("state", stateSelection);
  // When the generator is disposed, detach the event listener.
  return () => map.removeSignalListener("state", stateSelection);
})
)});
  main.variable(observer()).define(["md"], function(md){return(
md`### Scatter`
)});
  main.variable(observer("scatterLeftIntervalSelection")).define("scatterLeftIntervalSelection", ["Generators","mutable selected_customers_left","customer_id_group_view_left","scatterplot"], function(Generators,$0,customer_id_group_view_left,scatterplot){return(
Generators.observe(notify => {
  
  // Yield the input’s initial value.
  const scatterSelection = (name, value) => {
    
    $0.value = customer_id_group_view_left.filter(e => {
      if(value.sales){
        return e.sales  > value.sales[0]  && e.sales  < value.sales[1] &&
             e.profit > value.profit[0] && e.profit < value.profit[1]
      }
    }).map(e =>{
      return e["Customer ID"]
    });
    
    notify(value);
  }
  // Using Vega's view api, add a signal listener to the signal
  scatterplot.addSignalListener("brush_left", scatterSelection);
  // When the generator is disposed, detach the event listener.
  return () => scatterplot.removeSignalListener("brush", scatterSelection);
})
)});
  main.variable(observer()).define(["md"], function(md){return(
md`### Line`
)});
  main.variable(observer("lineSelection")).define("lineSelection", ["Generators","mutable selected_dates","linechart"], function(Generators,$0,linechart){return(
Generators.observe(notify => {
  // Yield the input’s initial value.
  const lineSelection = (name, value) => {
    debugger;
    if(value.order_date == undefined){
      $0.value = []
    }else {
      $0.value = value.order_date.slice();
    }
    notify(value);
  } 
  // Using Vega's view api, add a signal listener to the signal
  linechart.addSignalListener("brush", lineSelection);
  // When the generator is disposed, detach the event listener.
  return () => linechart.removeSignalListener("brush", lineSelection);
})
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## Selections`
)});
  main.define("initial filterState", function()
{
  return {
    selected_categories: [],
    selected_subcategories: [],
    selected_regions: [],
    selected_customer_ids: [],
    selected_states: []
  }
}
);
  main.variable(observer("mutable filterState")).define("mutable filterState", ["Mutable", "initial filterState"], (M, _) => new M(_));
  main.variable(observer("filterState")).define("filterState", ["mutable filterState"], _ => _.generator);
  main.variable(observer()).define(["md"], function(md){return(
md`#### Subcategories`
)});
  main.define("initial selected_subcategories", ["furnitureSubcategories","technologySubcategories","officeSuppliesSubcategories"], function(furnitureSubcategories,technologySubcategories,officeSuppliesSubcategories){return(
[...(new Set(
  (furnitureSubcategories || [])
  .concat(technologySubcategories || [])
  .concat(officeSuppliesSubcategories || [])))]
)});
  main.variable(observer("mutable selected_subcategories")).define("mutable selected_subcategories", ["Mutable", "initial selected_subcategories"], (M, _) => new M(_));
  main.variable(observer("selected_subcategories")).define("selected_subcategories", ["mutable selected_subcategories"], _ => _.generator);
  main.variable(observer()).define(["md"], function(md){return(
md`#### Categories`
)});
  main.variable(observer("selected_categories")).define("selected_categories", ["furnitureSelected","technologySelected","officeSuppliesSelected"], function(furnitureSelected,technologySelected,officeSuppliesSelected){return(
[
  furnitureSelected, technologySelected, officeSuppliesSelected
].filter(e => e !== "")
)});
  main.variable(observer()).define(["md"], function(md){return(
md`#### Regions`
)});
  main.variable(observer("selected_regions")).define("selected_regions", ["furnitureRegions","technologyRegions","officeSuppliesRegions"], function(furnitureRegions,technologyRegions,officeSuppliesRegions){return(
[...(new Set((furnitureRegions || [])
  .concat(technologyRegions || [])
  .concat(officeSuppliesRegions || [])))]
)});
  main.variable(observer()).define(["md"], function(md){return(
md`#### Furniture`
)});
  main.define("initial furnitureSelected", function(){return(
""
)});
  main.variable(observer("mutable furnitureSelected")).define("mutable furnitureSelected", ["Mutable", "initial furnitureSelected"], (M, _) => new M(_));
  main.variable(observer("furnitureSelected")).define("furnitureSelected", ["mutable furnitureSelected"], _ => _.generator);
  main.define("initial furnitureRegions", function(){return(
[]
)});
  main.variable(observer("mutable furnitureRegions")).define("mutable furnitureRegions", ["Mutable", "initial furnitureRegions"], (M, _) => new M(_));
  main.variable(observer("furnitureRegions")).define("furnitureRegions", ["mutable furnitureRegions"], _ => _.generator);
  main.define("initial furnitureSubcategories", function(){return(
[]
)});
  main.variable(observer("mutable furnitureSubcategories")).define("mutable furnitureSubcategories", ["Mutable", "initial furnitureSubcategories"], (M, _) => new M(_));
  main.variable(observer("furnitureSubcategories")).define("furnitureSubcategories", ["mutable furnitureSubcategories"], _ => _.generator);
  main.variable(observer()).define(["md"], function(md){return(
md`#### Technology`
)});
  main.define("initial technologySelected", function(){return(
""
)});
  main.variable(observer("mutable technologySelected")).define("mutable technologySelected", ["Mutable", "initial technologySelected"], (M, _) => new M(_));
  main.variable(observer("technologySelected")).define("technologySelected", ["mutable technologySelected"], _ => _.generator);
  main.define("initial technologyRegions", function(){return(
[]
)});
  main.variable(observer("mutable technologyRegions")).define("mutable technologyRegions", ["Mutable", "initial technologyRegions"], (M, _) => new M(_));
  main.variable(observer("technologyRegions")).define("technologyRegions", ["mutable technologyRegions"], _ => _.generator);
  main.define("initial technologySubcategories", function(){return(
[]
)});
  main.variable(observer("mutable technologySubcategories")).define("mutable technologySubcategories", ["Mutable", "initial technologySubcategories"], (M, _) => new M(_));
  main.variable(observer("technologySubcategories")).define("technologySubcategories", ["mutable technologySubcategories"], _ => _.generator);
  main.variable(observer()).define(["md"], function(md){return(
md`#### Office Supplies`
)});
  main.define("initial officeSuppliesSelected", function(){return(
""
)});
  main.variable(observer("mutable officeSuppliesSelected")).define("mutable officeSuppliesSelected", ["Mutable", "initial officeSuppliesSelected"], (M, _) => new M(_));
  main.variable(observer("officeSuppliesSelected")).define("officeSuppliesSelected", ["mutable officeSuppliesSelected"], _ => _.generator);
  main.define("initial officeSuppliesRegions", function(){return(
[]
)});
  main.variable(observer("mutable officeSuppliesRegions")).define("mutable officeSuppliesRegions", ["Mutable", "initial officeSuppliesRegions"], (M, _) => new M(_));
  main.variable(observer("officeSuppliesRegions")).define("officeSuppliesRegions", ["mutable officeSuppliesRegions"], _ => _.generator);
  main.define("initial officeSuppliesSubcategories", function(){return(
[]
)});
  main.variable(observer("mutable officeSuppliesSubcategories")).define("mutable officeSuppliesSubcategories", ["Mutable", "initial officeSuppliesSubcategories"], (M, _) => new M(_));
  main.variable(observer("officeSuppliesSubcategories")).define("officeSuppliesSubcategories", ["mutable officeSuppliesSubcategories"], _ => _.generator);
  main.variable(observer()).define(["md"], function(md){return(
md`#### States`
)});
  main.define("initial selected_states", function(){return(
[]
)});
  main.variable(observer("mutable selected_states")).define("mutable selected_states", ["Mutable", "initial selected_states"], (M, _) => new M(_));
  main.variable(observer("selected_states")).define("selected_states", ["mutable selected_states"], _ => _.generator);
  main.variable(observer()).define(["md"], function(md){return(
md`#### Customer ID's`
)});
  main.define("initial selected_customers_left", function(){return(
[]
)});
  main.variable(observer("mutable selected_customers_left")).define("mutable selected_customers_left", ["Mutable", "initial selected_customers_left"], (M, _) => new M(_));
  main.variable(observer("selected_customers_left")).define("selected_customers_left", ["mutable selected_customers_left"], _ => _.generator);
  main.variable(observer()).define(["md"], function(md){return(
md`#### Dates`
)});
  main.define("initial selected_dates", function(){return(
[]
)});
  main.variable(observer("mutable selected_dates")).define("mutable selected_dates", ["Mutable", "initial selected_dates"], (M, _) => new M(_));
  main.variable(observer("selected_dates")).define("selected_dates", ["mutable selected_dates"], _ => _.generator);
  main.variable(observer()).define(["md"], function(md){return(
md`# Library imports`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## Charting`
)});
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require("https://d3js.org/d3.v5.js")
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
  main.variable(observer()).define(["md"], function(md){return(
md`## Input`
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
  main.variable(observer()).define(["md"], function(md){return(
md`## Multidimensional data`
)});
  main.variable(observer("crossfilter")).define("crossfilter", ["require"], function(require){return(
require('https://bundle.run/crossfilter2@1.4.5')
)});
  main.variable(observer("moment")).define("moment", ["require"], function(require){return(
require('https://bundle.run/moment-timezone@0.5.14')
)});
  main.variable(observer()).define(["md"], function(md){return(
md`# Raw Data`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## Superstore`
)});
  main.variable(observer("superstore")).define("superstore", ["d3"], function(d3){return(
d3.json("https://raw.githubusercontent.com/churtado/superjson/master/superstore.json")
)});
  main.variable(observer("superstore_time")).define("superstore_time", ["superstore","renameProp","addStateId","moment"], function(superstore,renameProp,addStateId,moment){return(
superstore.map(e => renameProp("Order Date", "OrderDate", e))
.map( e => addStateId(e))
.map(e =>{ 
  e.OrderDateUnix = moment(e.OrderDate).unix()*1000
  return e;
})
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## Mapping`
)});
  main.variable(observer("tsv_state_names")).define("tsv_state_names", ["d3"], function(d3){return(
d3.tsv("https://raw.githubusercontent.com/churtado/opencorporatesd3/master/us-state-names.tsv")
)});
  main.variable(observer("topo_states")).define("topo_states", ["d3"], function(d3){return(
d3.json("https://raw.githubusercontent.com/churtado/vega-datasets/gh-pages/data/us-10m.json")
)});
  main.variable(observer()).define(["md"], function(md){return(
md`# Utilities`
)});
  main.variable(observer("log")).define("log", function(){return(
function log(args) {
  let message = args
  if (Array.isArray(args)) { message = args.join(', ') }
  console.log(new Date().toISOString(), message)  
}
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## ETL`
)});
  main.variable(observer("renameProp")).define("renameProp", function(){return(
(
  oldProp,
  newProp,
  { [oldProp]: old, ...others }
) => {
  return {
    [newProp]: old,
    ...others
  };
}
)});
  main.variable(observer("addStateId")).define("addStateId", ["tsv_state_names"], function(tsv_state_names){return(
(
  { "State": state, ...others }
) => {
  let s = tsv_state_names.filter(tsv_state => {
    return state == tsv_state.name
  })
  return {
    "State": state,
    "state_id": s[0].id,
    ...others
  };
}
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## Crossfilter Hack`
)});
  main.define("initial randomVar", function(){return(
Math.random()
)});
  main.variable(observer("mutable randomVar")).define("mutable randomVar", ["Mutable", "initial randomVar"], (M, _) => new M(_));
  main.variable(observer("randomVar")).define("randomVar", ["mutable randomVar"], _ => _.generator);
  main.variable(observer("updateRandomVar")).define("updateRandomVar", ["mutable randomVar"], function($0){return(
() => {
  $0.value = Math.random()
}
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## Crossfilter`
)});
  main.variable(observer("createCrossfilter")).define("createCrossfilter", ["log","superstore_time","crossfilter"], function(log,superstore_time,crossfilter){return(
async (fullDimensions) => {
  log('Loading data.');
  const data = superstore_time;
  const subsetDimensions = [
    "Customer ID",
    "state_id",
    "State",
    "Category",
    "Sub-Category",
    "Region",
    "Segment",
    "OrderDate",
    "OrderDateUnix"
  ];
  
  const dimensionList = fullDimensions ? Object.keys(data[0]) : subsetDimensions;
  
  const dateFormat = 'MM/DD/YYYY';
  
  const superstore = crossfilter(data);
  
  log('Crossfilter c reated, setting up dimensions and groups.');
  const dimensions = {}
  const groups = {}
  dimensionList.forEach((dimension) => {
    dimensions[dimension] = superstore.dimension((d) => { return d[dimension] });
    groups[dimension] = dimensions[dimension].group();
  });
  
  dimensions["cat_subcat_region_dimension"] = superstore.dimension(function(d) { 
    return JSON.stringify ( { category: d.Category , subcategory: d["Sub-Category"], region: d.Region } ) ;
  });
  groups["cat_subcat_region_dimension"] = dimensions["cat_subcat_region_dimension"].group();
  
  log('Crossfilter and setup finished.');
  
  return {
    superstore: superstore,
    dimensions: dimensions,
    dimensionList: dimensionList,
    groups: groups
  };
}
)});
  main.variable(observer("filterGroupByDimensions")).define("filterGroupByDimensions", ["dataStructure","updateRandomVar"], function(dataStructure,updateRandomVar){return(
(groupkey, dimensionMapArray, reducers, mapper) => {
  
  dimensionMapArray.forEach(e => {
    let dimension = dataStructure.dimensions[e.key];
    let values = e.value;
    
    if( e.filterFunction == undefined) {
      // filter the dimension
      dimension.filterFunction( (f)=> {
        if(values.length > 0){
          return values.indexOf(f) >= 0
        } else {
          return true;
        }
      });
    } else {
      dimension.filterFunction(e.filterFunction);
    }
  });
  
   // generate new group and reduce
  let group = dataStructure.groups[groupkey];
  
  let result = group.reduce(reducers.reduceAdd, reducers.reduceRemove, reducers.reduceInitial).all()
    .map(mapper).slice()
  
  updateRandomVar();
  return result;
}
)});
  main.variable(observer()).define(["md"], function(md){return(
md`# Data`
)});
  main.variable(observer("dataStructure")).define("dataStructure", ["createCrossfilter"], function(createCrossfilter){return(
createCrossfilter(false)
)});
  main.variable(observer("cat_subcat_region_view")).define("cat_subcat_region_view", ["filterGroupByDimensions","selected_customers_left","selected_dates"], function(filterGroupByDimensions,selected_customers_left,selected_dates){return(
filterGroupByDimensions ("cat_subcat_region_dimension", 
  [
    //{key: "State", value: selected_states.slice()},
    {key: "Customer ID", value: selected_customers_left.slice()},
    {key: "OrderDateUnix", 
     value: selected_dates.slice(), 
     filterFunction: (f) => {
       let range_dates = selected_dates.slice();
       if(range_dates.length > 0) {
         debugger;
         return (f >= range_dates[0] && f <= range_dates[1]);
       } else {
         return true;
       }
     }
    }
  ],
  {
    reduceAdd: (p, v) => {
      return {
        sales: p.sales + v.Sales, profit: p.profit + v.Profit 
      };
    },
    reduceRemove: (p, v) => {
      return {sales: p.sales - v.Sales, profit: p.profit - v.Profit };
    },
    reduceInitial: () =>  {
      return {sales: 0, profit: 0};
    }
  },
  ({key: k, value: {sales: s, profit: p} }) => {
    let d = JSON.parse(k);
    return { category: d.category, region: d.region, subcategory: d.subcategory, sales: s, profit: p};
  }                            
)
)});
  main.variable(observer("customer_id_group_view_left")).define("customer_id_group_view_left", ["filterGroupByDimensions"], function(filterGroupByDimensions){return(
filterGroupByDimensions ("Customer ID", 
  [
    /*{key: "State", value: selected_states.slice()},
    {key: "Category", value: selected_categories.slice()},
    {key: "Sub-Category", value: selected_subcategories.slice()},
    {key: "Region", value: selected_regions.slice()}*/
  ],
  {
    reduceAdd: (p, v) => {
      return {
        sales: p.sales + v.Sales, profit: p.profit + v.Profit 
      };
    },
    reduceRemove: (p, v) => {
      return {sales: p.sales - v.Sales, profit: p.profit - v.Profit };
    },
    reduceInitial: () =>  {
      return {sales: 0, profit: 0};
    }
  },
  ({key: k, value: {sales: s, profit: p} }) => {
    return {"Customer ID": k, sales: s, profit: p};
  })
)});
  main.variable(observer("customer_id_group_view_right")).define("customer_id_group_view_right", ["filterGroupByDimensions","selected_states","selected_categories","selected_subcategories","selected_regions","selected_dates"], function(filterGroupByDimensions,selected_states,selected_categories,selected_subcategories,selected_regions,selected_dates){return(
filterGroupByDimensions ("Customer ID", 
  [
    {key: "State", value: selected_states.slice()},
    {key: "Category", value: selected_categories.slice()},
    {key: "Sub-Category", value: selected_subcategories.slice()},
    {key: "Region", value: selected_regions.slice()},
    {key: "OrderDateUnix", 
         value: selected_dates.slice(), 
         filterFunction: (f) => {
           let range_dates = selected_dates.slice();
           if(range_dates.length > 0) {
             debugger;
             return (f >= range_dates[0] && f <= range_dates[1]);
           } else {
             return true;
           }
         }
      }
  ],
  {
    reduceAdd: (p, v) => {
      return {
        sales: p.sales + v.Sales, profit: p.profit + v.Profit 
      };
    },
    reduceRemove: (p, v) => {
      return {sales: p.sales - v.Sales, profit: p.profit - v.Profit };
    },
    reduceInitial: () =>  {
      return {sales: 0, profit: 0};
    }
  },
  ({key: k, value: {sales: s, profit: p} }) => {
    return {"Customer ID": k, sales: s, profit: p};
  })
)});
  main.variable(observer("state_group_view")).define("state_group_view", ["filterGroupByDimensions","selected_categories","selected_subcategories","selected_regions","selected_dates","tsv_state_names"], function(filterGroupByDimensions,selected_categories,selected_subcategories,selected_regions,selected_dates,tsv_state_names){return(
filterGroupByDimensions ("State", 
  [
    {key: "Segment", value: []},
    //{key: "Customer ID", value: selected_customers_left.slice()},
    {key: "Category", value: selected_categories.slice()},
    {key: "Sub-Category", value: selected_subcategories.slice()},
    {key: "Region", value: selected_regions.slice()},
    {key: "OrderDateUnix", 
       value: selected_dates.slice(), 
       filterFunction: (f) => {
         let range_dates = selected_dates.slice();
         if(range_dates.length > 0) {
           debugger;
           return (f >= range_dates[0] && f <= range_dates[1]);
         } else {
           return true;
         }
       }
    }
  ],
  {
    reduceAdd: (p, v) => {
      return {
        sales: p.sales + v.Sales, profit: p.profit + v.Profit 
      };
    },
    reduceRemove: (p, v) => {
      return {sales: p.sales - v.Sales, profit: p.profit - v.Profit };
    },
    reduceInitial: () =>  {
      return {sales: 0, profit: 0};
    }
  },
  ({key: k, value: {sales: s, profit: p} }) => {
    return {"State": k, sales: s, profit: p};
  }
)
// a little extra etl
.map(e => {
  let state_id = tsv_state_names.find(f => {
    return f.name == e.State
  });
  return {state_id: state_id.id, state: e.State, sales: e.sales, profit: e.profit}
})
)});
  main.variable(observer("order_date_group_view")).define("order_date_group_view", ["filterGroupByDimensions","moment"], function(filterGroupByDimensions,moment){return(
filterGroupByDimensions ("OrderDate", 
  [  ],
  {
    reduceAdd: (p, v) => {
      return {
        sales: p.sales + v.Sales, profit: p.profit + v.Profit 
      };
    },
    reduceRemove: (p, v) => {
      return {sales: p.sales - v.Sales, profit: p.profit - v.Profit };
    },
    reduceInitial: () =>  {
      return {sales: 0, profit: 0};
    }
  },
  ({key: k, value: {sales: s, profit: p} }) => {
    return {"order_date": moment(k).unix()*1000, sales: s, profit: p};
  }
)
)});
  main.variable(observer("filterStack")).define("filterStack", function()
{
  class Stack {
    constructor() {
      this.items = [];
      this.count = 0;
    }

    getLength() {
      return this.count;
    }

    push(item) {
      this.items.push(item);
      this.count = this.count + 1;
    }

    pop() {
      if(this.count > 0) {
        this.count = this.count - 1;
      }

      return this.items.pop();
    }

    peek() {
      return this.items.slice(-1)[0];
    }

    print() {
      console.log(this.items);
    }
  }
  let stack = new Stack();
  stack.push("bar");
  return stack;
  
}
);
  return main;
}