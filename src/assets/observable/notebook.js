// https://observablehq.com/@churtado/fco-demo@641
export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# FCO Demo`
)});
  main.variable(observer("viewof popslider3")).define("viewof popslider3", ["html","transform"], function(html,transform)
{
  const form = html`<form>
  <div><input name=s type=range min=100 max=15000 value=20000 step=any ></div>
</form>`;
  form.value = 101758757.50843729;
  form.s.oninput = () => form.l.value = form.value = transform(form.s.valueAsNumber);
  return form;
}
);
  main.variable(observer("popslider3")).define("popslider3", ["Generators", "viewof popslider3"], (G, _) => G.input(_));
  main.variable(observer("viewof popslider4")).define("viewof popslider4", ["html","transform"], function(html,transform)
{
  const form = html`<form>
  <div><input name=s type=range min=100 max=36000 step=any></div>
</form>`;
  form.value = 1296000000;
  form.s.oninput = () => form.l.value = form.value = transform(form.s.valueAsNumber);
  
  return form;
}
);
  main.variable(observer("popslider4")).define("popslider4", ["Generators", "viewof popslider4"], (G, _) => G.input(_));
  main.variable(observer("facet1")).define("facet1", ["vl","data2000","popslider3","popslider4"], function(vl,data2000,popslider3,popslider4)
{
  const brush = vl.selectInterval()
    .encodings('y'); // limit selection to x-axis (year) values
  
  const bar = vl.markBar()
  .data(data2000)
  .select(brush)
  .transform(
  vl.filter('datum.pop >= ' + popslider3),
  vl.filter('datum.pop <= ' + popslider4),
  )
  .encode(
    vl.x().fieldQ('pop'),
    vl.y().fieldN('country').sort(vl.sum('pop').order('descending')),
    vl.tooltip(['country', 'pop'])
  )
  .height(400);
  
  const stackedBar = vl.markBar()
  .data(data2000)
  .transform(
    vl.filter(brush)
  )
  .encode(
    vl.x().fieldN('cluster').sort(vl.sum('pop').order('descending')),
    vl.y().fieldQ('pop'),
    vl.color().fieldN('country').legend(null),
    vl.tooltip(['country', 'pop']),
    vl.opacity().if(brush, vl.value(0.75)).value(0.05)
  )
  .height(400);
  
  return vl.hconcat(bar,stackedBar).render();
}
);
  main.variable(observer("viewof weatherSelect")).define("viewof weatherSelect", ["vega","weather"], function(vega,weather){return(
vega({
  "$schema": "https://vega.github.io/schema/vega-lite/v2.json",
  description: "A simple bar chart with embedded data.",
  width: 360,
  data: { values: weather },
  mark: "bar",
  selection: {
    barSelection: {fields: ["weather"], on: "click", type: "multi"}
  },
  encoding: {
    x: { field: "weather", type: "nominal", sort: {op: "count", order: "descending"} },
    y: {aggregate: "count", field: "*", "type": "quantitative"}
  }
})
)});
  main.variable(observer("weatherSelect")).define("weatherSelect", ["Generators", "viewof weatherSelect"], (G, _) => G.input(_));
  main.variable(observer("barSelection")).define("barSelection", ["Generators","weatherSelect"], function(Generators,weatherSelect){return(
Generators.observe(notify => {
  const barSelection = (name, value) => notify(value);
  weatherSelect.addSignalListener("barSelection", barSelection);
  notify(weatherSelect.signal("barSelection"));
  return () => weatherSelect.removeSignalListener("barSelection", barSelection);
})
)});
  main.variable(observer("selection")).define("selection", ["isEmpty","barSelection"], function(isEmpty,barSelection)
{
 if(isEmpty(barSelection)){
   //return ["rain", "fog", "drizzle", "sun", "snow"]
   return [];
 } else {
   return barSelection.weather
 }
}
);
  main.variable(observer("viewof popupView")).define("viewof popupView", ["vega","weather","selection"], function(vega,weather,selection){return(
vega({
  "$schema": "https://vega.github.io/schema/vega-lite/v2.json",
  width: 360,
  data: {values: weather},
  mark: "area",
  transform: [
    {filter: {field: "weather", oneOf: selection}}
  ],
  encoding: {
    x: {timeUnit: "month", field: "date", type: "temporal"},
    y: {aggregate: "mean", field: "precipitation", type: "quantitative"},
    color: {field: "weather", type: "nominal"}
  }
})
)});
  main.variable(observer("popupView")).define("popupView", ["Generators", "viewof popupView"], (G, _) => G.input(_));
  main.variable(observer("isEmpty")).define("isEmpty", function(){return(
function isEmpty( obj ) { 
      for ( var prop in obj ) { 
        return false; 
      } 
      return true; 
    }
)});
  main.variable(observer("vl")).define("vl", ["require"], async function(require)
{
  const [vega, vegalite, api, tooltip] = await Promise.all([
    'vega@5',
    'vega-lite@3.2.1',
    'vega-lite-api@0.0.15',
    'vega-tooltip@0.17.0'
  ].map(module => require(module)));

  const options = {
    config: {
      // vega-lite default configuration
      config: {
        view: {width: 400, height: 300},
        mark: {tooltip: null}
      }
    },
    init: view => {
      // initialize tooltip handler
      view.tooltip(new tooltip.Handler().call);
      // enable horizontal scrolling for large plots
      if (view.container()) view.container().style['overflow-x'] = 'auto';
    },
    view: {
      // view constructor options
      loader: vega.loader({baseURL: 'https://vega.github.io/vega-datasets/'}),
      renderer: 'canvas'
    }
  };
  
  return api.register(vega, vegalite, options);
}
);
  main.variable(observer("data")).define("data", ["d3"], function(d3){return(
d3.json("https://raw.githubusercontent.com/vega/vega/master/docs/data/gapminder.json")
)});
  main.variable(observer("data2000")).define("data2000", ["data"], function(data){return(
data.filter(d => d.year === 2000)
)});
  main.variable(observer("d3format")).define("d3format", ["require"], function(require){return(
require("d3-format@1")
)});
  main.variable(observer("slider")).define("slider", ["input"], function(input){return(
function slider(config = {}) {
  let {value, min = 0, max = 1, step = "any", precision = 2, title, description, getValue, format, display, submit} = config;
  if (typeof config == "number") value = config;
  if (value == null) value = (max + min) / 2;
  precision = Math.pow(10, precision);
  if (!getValue) getValue = input => Math.round(input.valueAsNumber * precision) / precision;
  return input({
    type: "range", title, description, submit, format, display,
    attributes: {min, max, step, value},
    getValue
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
  main.variable(observer("transform")).define("transform", function()
{
  const transform = x => x * x; // from nonlinear to linear
  transform.invert = x => Math.log(x); // from linear to nonlinear
  return transform;
}
);
  main.variable(observer("embed")).define("embed", ["require"], function(require){return(
require("vega-embed@3")
)});
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require("https://d3js.org/d3.v5.js")
)});
  main.variable(observer("vega_explicit")).define("vega_explicit", ["require"], async function(require)
{
  const [Vega, VegaLite] = await Promise.all([
    require("vega@3/build/vega.min.js"),
    require("vega-lite@3/build/vega-lite.min.js")
  ]);
  return async spec => {
    const div = document.createElement("div");
    const view = new Vega.View(Vega.parse(VegaLite.compile(spec).spec));
    await view.initialize(div).runAsync();
    return div;
  };
}
);
  main.variable(observer("weather")).define("weather", ["d3"], function(d3){return(
d3.csv("https://raw.githubusercontent.com/vega/vega/master/docs/data/seattle-weather.csv")
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
  return main;
}