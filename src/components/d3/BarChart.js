import React from 'react';
import * as d3 from 'd3';
import useD3 from "../../hooks/useD3";
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
} from "./js/utilities";
import { /* data, */ movingAverage, getColours, getDifference } from "./js/chartParts";
// import barChart from "./js/barChart";

function BarChart({ vars, type, data }) {

  const width = 600;
  const height = 400;
  // const type = "deaths";
  const movingAverageOn = true;
  // const vars = {
  //   "bc_start": "29",
  //   "bc_step": "42",
  //   "data_type": "deaths",
  //   "headings": [
  //     "cases",
  //     "deaths",
  //     "tests"
  //   ]
  // }


  const ref = useD3(
    (svg) => {

      const difference = getDifference(data, type);
      const smoothData = movingAverageOn ? movingAverage(data, difference) : null;

      const { colour, lighterColour } = getColours(type);

      const margin = { top: 30, right: 30, bottom: 30, left: 60 };
      const elW = width - margin.left - margin.right;
      const elH = height - margin.top - margin.bottom;
      const barW = (elW / difference.length) * 0.6;

      const fontLimit = limit(barW / 1.2, 8, 20);
      const fontSize = 10;
      const fontFamily = "Popular, sans-serif";
      const fontWeight = 700;


      const step = 10; //vars.bc_step;

      const tickVals = divideTicks(data, step);
      const dateFormat = "%d %b";
      const parseTime = d3.timeParse("%d/%m/%Y");


      const x = d3
        .scaleLinear()
        .rangeRound([0, width - margin.right - margin.left])
        .domain(d3.extent(data, d => parseTime(d.date)))
        .nice();

      const y1 = d3
        .scaleLinear()
        .rangeRound([elH, margin.top])
        .domain([0, d3.max(difference)])
        .nice();


      const xAxis = (g) =>
        g
          .attr("transform", `translate(${margin.left}, ${elH})`)
          .style("color", "white")
          .style("font-family", fontFamily)
          .attr("font-weight", fontWeight)
          .style("font-size", fontSize * 1.3)
          .call(d3
            .axisBottom(x)
            .tickFormat(d3.timeFormat(dateFormat))
            .tickValues(tickVals)
            .tickSizeOuter(0)
          )
      // .selectAll(".tick text")
      // .attr("transform", function (d) {
      //   return "translate(0, 0)";
      //   //return "translate(" + this.getBBox().height*-2 + "," + this.getBBox().height + ")rotate(-45)";
      // })
      // .call(wrap, 24);

      const y1Axis = (g) =>
        g
          .attr("transform", `translate(${margin.left},0)`)
          .style("color", "white")
          .style("font-family", fontFamily)
          .attr("font-weight", fontWeight)
          .call(d3.axisLeft(y1)
            .ticks(null, "s")
          )
          // .call((g) => g.select(".domain").remove())
          .call((g) =>
            g
              .append("text")
              .attr("x", -margin.left)
              .attr("y", 10)
              .attr("fill", "currentColor")
              .attr("text-anchor", "start")
              .text(data.y1)
          );

      const y2Axis = (g) =>
        g
          .attr("transform", `translate(${margin.left}, 0)`)
          .style("color", "white")
          .style("font-family", fontFamily)
          .attr("font-weight", fontWeight)
          .style("stroke-width", 0.5)
          .style("opacity", 0.4)
          .call(d3.axisLeft(y1)
            .scale(y1)
            .tickSize(-elW)
            .tickFormat("")
          )

      svg.select(".x-axis").call(xAxis);
      svg.select(".y-axis").call(y1Axis);
      svg.select(".y-axis-lines").call(y2Axis);

      svg
        .select(".plot-area")
        .attr("transform", `translate(${margin.left}, 0)`)
        .attr("fill", colour)
        .attr("stroke-width", 0)
        .selectAll(".bar")
        .data(data)
        .join("rect")
        .attr("class", "bar")
        .attr("x", (d) => x(parseTime(d.date)) + (barW))
        .attr("width", barW)
        .attr("y", (d, i) => y1(difference[i]))
        .attr("height", (d, i) => elH - y1(difference[i]));
    },
    [data.length, type]
  );

  return (
    <div style={{ backgroundColor: 'grey' }}>
      <svg
        ref={ref}
        style={{
          border: "1px solid black",
          height: height,
          width: width,
          // marginRight: "0px",
          // marginLeft: "0px",
        }}
      >
        <g className="plot-area" />
        <g className="x-axis" />
        <g className="y-axis" />
        <g className="y-axis-lines" />
      </svg>
    </div>
  );
}

export default BarChart;
