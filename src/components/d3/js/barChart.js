import * as d3 from 'd3';
import {
  wrap,
  divideTicks,
  // insertDate,
  // mapVal,
  // parseNums,
  padCommas,
  // flashRed,
  // invertHexColour,
  limit,
  // getDataType,
  // everyDay,
} from "./utilities";

export default function barChart(svg, data, type, _width, _height) {

  const turnMovingAvgOn = true;

  let difference = [];
  let colour;
  let lighterColour;
  // let el;
  for (let i = 1; i < data.length; i++) {
    // console.log(data[i][type])
    difference.push(data[i][type] - data[i - 1][type]);
    // difference.push(data[i].deaths - data[i-1].deaths);
  }
  // data.shift();
  if (type === "deaths") {
    colour = "#E51212";
    lighterColour = "#FFB0B0";
    // el = "#deathsGraph"
  } else if (type === "cases") {
    colour = "#FFCC00";
    lighterColour = "#FFCC00";
    // el = "#casesGraph";
  } else if (type === "tests") {
    colour = "#71B749";
    lighterColour = "#71B749";
  }
  // el = "#barGraph";


  const movingAverage = (data, windowSize = 7) => {


    //make the smooth adta for rolling 7 day avg
    // makes trailing 7 pt average.
    // swap comments on for loops for centered 7 pt average
    let smoothData = [];
    for (let i = windowSize - 1; i < data.length; i++) {
      // for (let i = 0; i < data.length; i++) {
      let total = 0;
      let divideBy = 0;
      for (let j = 0 - windowSize + 1; j <= 0; j++) {
        // for (let j = -3; j <= 3; j++) {
        let avg = difference[i + j];
        if (avg) {
          total += avg;
          divideBy++;
        }
      }
      let avg = total / divideBy;
      if (!isNaN(avg)) {
        let obj = { date: data[i].date, avg: Math.round(avg) };
        smoothData.push(obj);
      }
    }
    console.log(smoothData)
    return smoothData;
  }



  let width = _width;
  let height = _height;
  // let height = 450;
  let margin = { top: 15, right: 30, bottom: 60, left: 60 };
  let elW = width - margin.left - margin.right;
  let elH = height - margin.top - margin.bottom;
  let barW = (elW / difference.length) * 0.6;
  // console.log(barW)
  let fontLimit = limit(barW / 1.2, 8, 20);
  let fontsize = 10;
  let step = 1;//jsonObj.vars.bc_step;

  let tickVals = divideTicks(data, step);
  // console.log(tickVals)

  // let svg = d3.select(el).append("svg")
  //   .attr("id", type + "_graph")
  //   .attr("width", width)
  //   .attr("height", height);
  let g = svg.append("g")
    .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");


  var xFormat = "%d %b";
  var parseTime = d3.timeParse("%d/%m/%Y");
  let x = d3.scaleLinear()
    // .domain([
    //     d3.min(data, function(d) {
    //         return d.date;
    //     }),
    //     d3.max(data, (d) => d.date)
    // ])
    .range([0 + barW / 2, elW - margin.left - (barW / 2)])
  // .nice();

  x.domain(d3.extent(data, (d) => parseTime(d.date)));
  // let xS = d3.svg.axis()   // not a fucntion
  //     .tickValues( x.ticks( 5 ).concat( x .domain() ) )

  let y = d3.scaleLinear()
    .range([elH, margin.top]);

  y.domain([0, d3.max(difference, function (d) {
    return d;
  })])
    .nice();

  // let y_axis = d3.axisBottom(y);

  g.append("g")
    .attr("transform", "translate(0, 0)")
    .style("font-family", "Popular, sans-serif")
    .attr("font-weight", 700)
    .style("font-size", fontsize * 1.2)
    .call(d3.axisLeft(y)
      .tickSize(5)
    );

  // y axis gridlines full width
  g.append('g')
    .attr("transform", "translate(0,0)")
    .attr('class', 'grid')
    .style("color", "white")
    .style("stroke-width", 0.5)
    .style("opacity", 0.4)
    .call(d3.axisLeft()
      .scale(y)
      .tickSize(-elW + margin.left)
      // .ticks(10)
      .tickFormat(''));

  g.append("g")
    .attr("transform", "translate(0, " + elH + ")")
    .style("font-family", "Popular, sans-serif")
    .attr("font-weight", 700)
    .style("font-size", fontsize * 1.3)
    .call(d3.axisBottom(x)
      .tickFormat(d3.timeFormat(xFormat))
      .tickValues(tickVals)
      .tickSize(3)
    )
    .selectAll(".tick text")
    .attr("transform", function (d) {
      return "translate(0, 0)";
      //return "translate(" + this.getBBox().height*-2 + "," + this.getBBox().height + ")rotate(-45)";
    })
    .call(wrap, 24);
  // console.log(Math.floor(mapVal(difference.length, 2, 100, 1, 10)));
  g.append("g").selectAll("bars")
    .data(data)
    .enter()
    .append("rect")
    .attr("fill", colour)
    .attr('x', (d) => x(parseTime(d.date)) - (barW / 2))
    .attr("y", function (d, i) {
      return y(difference[i]);
    })
    .attr("height", function (d, i) {
      return elH - y(difference[i])//y(0);
    })
    .attr('width', () => barW)
    .on("mouseover", handleMouseOver)
    .on("mouseout", handleMouseOut)
    .on("click", handleShowValue);
  // .attr("class", function(d) { return d.id; })
  // .call(yScale);

  if (turnMovingAvgOn) {
    let magroup = g.append("g")
      .attr("id", "moving_average");
    magroup.append("path")
      .datum(smoothData)
      .attr("id", "moving-average-outerStroke")
      .style("stroke", "#ffffff")
      .style("stroke-width", 8)
      .style("stroke-linecap", "round")
      .style("stroke-linejoin", "round")
      .style("fill", "none")
      // .style("filter", "url(#drop-shadow)")
      .attr("d", d3.line()
        .x(function (d) { return x(parseTime(d.date)); })
        .y(function (d) { return y(d.avg); })
        // .curve(d3.curveMonotoneX)
      );
    magroup.append("path")
      .datum(smoothData)
      .attr("id", "moving-average-innerStroke")
      .style("stroke", "#00aeef")
      .style("stroke-width", 4)
      .style("stroke-linecap", "round")
      .style("stroke-linejoin", "round")
      .style("fill", "none")
      // .style("filter", "url(#drop-shadow)")
      .attr("d", d3.line()
        .x(function (d) { return x(parseTime(d.date)); })
        .y(function (d) { return y(d.avg); })
        // .curve(d3.curveMonotoneX)
      );
  }


  // g.append("g").selectAll("changeText")
  //     .data(data)
  //     .enter()
  //     .append("text")
  //     .text((d,i)=> padCommas(difference[i]))
  //     // .attr("x",(d,i)=> x(parseTime(d.date)) - (barW/2))
  //     // .attr("y", (d,i)=> y(difference[i]))
  //     .attr("transform", function(d, i) {
  //         let xpos = x(parseTime(d.date));
  //         let ypos = y(difference[i])-3;
  //         return `translate(${xpos}, ${ypos}) scale(0.8, 1)`;
  //     })
  //     .attr("class", "totalTextLighter")
  //     .style("font-family", "Popular, sans-serif")
  //     .style("font-weight", 700)
  //     // .style("font-size", fontsize*barW)
  //     .style("font-size", fontLimit)
  //     .attr("fill", "#FFFFFF")
  //     .attr("text-anchor", "middle");

  // g.append("g").selectAll("runningTotal")
  //     .data(data)
  //     .enter()
  //     .append("text")
  //     .text((d,i)=> padCommas(data[i][type]))
  //     // .attr("x",(d,i)=> x(parseTime(d.date)) - (barW/2))
  //     // .attr("y", (d,i)=> y(difference[i]))
  //     .attr("transform", function(d, i) {
  //         let xpos = x(parseTime(d.date));
  //         let ypos = y(0) + 40;
  //         return `translate(${xpos}, ${ypos}) scale(0.8, 1)`;
  //     })
  //     .style("font-family", "Popular, sans-serif")
  //     .style("font-weight", 700)
  //     .style("font-size", fontLimit)
  //     .attr("fill", "#FFFFFF")
  //     .attr("text-anchor", "middle");

  let totalGroup = g.append("g");
  let changeGroup = g.append("g");
  for (let i = data.length - 1; i >= 0; i -= step) {
    totalGroup.append("text")
      .text((d) => padCommas(data[i][type]))
      // .attr("x",(d,i)=> x(parseTime(d.date)) - (barW/2))
      // .attr("y", (d,i)=> y(difference[i]))
      .attr("transform", function () {
        let xpos = x(parseTime(data[i].date));
        let ypos = y(0) + 48;
        return `translate(${xpos}, ${ypos}) scale(0.8, 1)`;
      })
      .attr("class", "totalTextLighter")
      .style("font-family", "Popular, sans-serif")
      .style("font-weight", 700)
      .style("font-size", fontLimit * 1.6)
      .attr("fill", "#FFFFFF")
      .attr("text-anchor", "middle");

    // if (data[i].showVal === 1) {
    // changeGroup.append("text")
    //     .text((d)=> padCommas(difference[i]))
    //     // .attr("x",(d,i)=> x(parseTime(d.date)) - (barW/2))
    //     // .attr("y", (d,i)=> y(difference[i]))
    //     .attr("transform", function(d) {
    //         let xpos = x(parseTime(data[i].date));
    //         let ypos = y(difference[i])-3;
    //         return `translate(${xpos}, ${ypos}) scale(0.8, 1)`;
    //     })
    //     .attr("class", "totalTextLighter")
    //     .style("font-family", "Popular, sans-serif")
    //     .style("font-weight", 700)
    //     // .style("font-size", fontsize*barW)
    //     .style("font-size", fontLimit*2)
    //     .attr("fill", "#FFFFFF")
    //     .attr("text-anchor", "middle");
    // }
  }
  for (let i = 0; i < data.length; i++) {
    if (data[i].showVal[type] === 1) {
      changeGroup.append("text")
        .text((d) => padCommas(difference[i]))
        // .attr("x",(d,i)=> x(parseTime(d.date)) - (barW/2))
        // .attr("y", (d,i)=> y(difference[i]))
        .attr("transform", function (d) {
          let xpos = x(parseTime(data[i].date));
          let ypos = y(difference[i]) - 3;
          return `translate(${xpos}, ${ypos}) scale(0.8, 1)`;
        })
        .attr("id", "value_" + i)
        .attr("class", "totalTextLighter")
        .style("font-family", "Popular, sans-serif")
        .style("font-weight", 700)
        // .style("font-size", fontsize*barW)
        .style("font-size", fontLimit * 1.6)
        .attr("fill", "#FFFFFF")
        .attr("text-anchor", "middle")

        .style("stroke", "#233D45")
        // .style("text-shadow", "0 0 24px black")
        .style("stroke-width", "4px")
        .style("paint-order", "stroke fill")
        .style("fill", lighterColour);
    }
  }


  g.append('text')
    .attr("class", "totalTextLighter")
    .text("TOTAL")
    .attr("font-family", "Popular, sans-serif")
    .attr("font-weight", 700)
    .attr("font-size", fontsize * 1.4)
    .attr("text-anchor", "end")
    .attr("transform", `translate(${x(parseTime(data[0].date)) - 20}, ${y(0) + 48}) scale(0.8, 1)`)

  g.selectAll("line")
    .style("stroke", "#fff");
  g.selectAll("path")
    .style("stroke", "#fff");
  g.selectAll("text")
    .style("fill", "#fff");

  g.select("#moving-average-outerStroke")
    .style("stroke", "#ffffff");
  g.select("#moving-average-innerStroke")
    .style("stroke", "#00aeef");

  g.selectAll(".totalTextLighter")
    .style("stroke", "#233D45")
    // .style("text-shadow", "0 0 24px black")
    .style("stroke-width", "4px")
    .style("paint-order", "stroke fill")
    .style("fill", lighterColour);




  function handleMouseOver(d, i) {
    // d3.select(this)
    //   .attr("fill", "white");
    // try {
    //   infobox.innerHTML = `
    //               <br /><br />
    //               date: ${d.date}<br />
    //               total: ${padCommas(d[type])}<br />
    //               new: ${padCommas(difference[i])}<br />
    //               7-day avg: ${padCommas(smoothData[i - 6].avg)}
    //           `;
    // } catch (e) {
    //   infobox.innerHTML = `
    //               <br /><br />
    //               date: ${d.date}<br />
    //               total: ${padCommas(d[type])}<br />
    //               new: ${padCommas(difference[i])}<br />
    //               7-day avg: no data
    //           `;
    // }
  }
  function handleMouseOut(d, i) {
    // d3.select(this)
    //   .attr("fill", colour);
    // infobox.innerHTML = `<br /><br />
    //           date: <br />
    //           total: <br />
    //           new: <br />
    //           7-day avg:
    //       `;
  }
  function handleShowValue(d, i) {
    // let index = Number(bc_startSlider.value) + i + 1;
    let index = 1 + i + 1;
    console.log(index);
    if (data[i].showVal[type] !== 1) {
      data[i].showVal[type] = 1;
      /* jsonObj. */data[index].showVal[type] = 1;
      changeGroup.append("text")
        .text((d) => padCommas(difference[i]))
        // .attr("x",(d,i)=> x(parseTime(d.date)) - (barW/2))
        // .attr("y", (d,i)=> y(difference[i]))
        .attr("transform", function (d) {
          let xpos = x(parseTime(data[i].date));
          let ypos = y(difference[i]) - 3;
          return `translate(${xpos}, ${ypos}) scale(0.8, 1)`;
        })
        .attr("id", "value_" + i)
        .attr("class", "totalTextLighter")
        .style("font-family", "Popular, sans-serif")
        .style("font-weight", 700)
        // .style("font-size", fontsize*barW)
        .style("font-size", fontLimit * 1.6)
        .attr("fill", "#FFFFFF")
        .style("stroke", "#233D45")
        // .style("text-shadow", "0 0 24px black")
        .style("stroke-width", "4px")
        .style("paint-order", "stroke fill")
        .style("fill", lighterColour)
        .attr("contentEditable", "true")
        .style("user-modify", "read-write")
        .attr("text-anchor", "middle");
    } else {
      d3.select("#value_" + i).remove();
      data[i].showVal[type] = 0;
      /* jsonObj. */data[index].showVal[type] = 0;
    }
  }
}
