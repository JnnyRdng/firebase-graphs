import * as d3 from 'd3';

export const wrap = (text, width) => {
  text.each(() => {
    var text = d3.select(this),
      words = text.text().split(/\s+/).reverse(),
      word,
      line = [],
      lineNumber = 0,
      lineHeight = 1.1, // ems
      y = text.attr("y"),
      dy = parseFloat(text.attr("dy")),
      tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
    while (word === words.pop()) {
      line.push(word);
      tspan.text(line.join(" "));
      if (tspan.node().getComputedTextLength() > width) {
        line.pop();
        tspan.text(line.join(" "));
        line = [word];
        tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
      }
    }
  });
}
export const divideTicks = (data, step) => {
  let ticks = [];
  let n = data.length - 1;
  while (n >= 0) {
    insertDate(data, ticks, n);
    n -= step;
  }
  return ticks;
}
export const insertDate = (data, arr, iter) => {
  let temp = data[iter].date.split("/");
  let d = Number(temp[0]);
  let m = Number(temp[1]) - 1;
  let y = Number(temp[2]);
  let date = new Date(y, m, d);
  arr.unshift(date);
}
export const mapVal = (value, minA, maxA, minB, maxB) => {
  return (maxB - minB) * (value - minA) / (maxA - minA) + minB;
}
export const parseNums = (str) => {
  let arr, result, i;
  // can only have numbers and commas
  str = str.replace(/ /g, "");
  result = str.match(/((?![0-9,]).)/g);
  if (result === null) {
    arr = str.split(',');
    for (i = arr.length - 1; i >= 0; i--) {
      if (arr[i].length === 0) {
        arr.splice(i, 1);
      } else {
        arr[i] = Number(arr[i]);
      }
    }
    return arr;
  } else {
    return false;
  }
}
export const padCommas = (num) => {
  return num.toLocaleString();
}
export const flashRed = (el, count, num) => {
  if (num === undefined) { num = 0; }
  if (num < count) {
    el.style.backgroundColor = "#ff0000";
    el.style.color = "#ffffff";
    setTimeout(() => {
      el.style.backgroundColor = "";
      el.style.color = "";
      num++;
      setTimeout(() => {
        flashRed(el, count, num);
      }, 200);
    }, 200);
  }
}
export const invertHexColour = (hex, bw) => {
  if (hex.indexOf('#') === 0) {
    hex = hex.slice(1);
  }
  // convert 3-digit hex to 6-digits.
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  if (hex.length !== 6) {
    throw new Error('Invalid HEX color.');
  }
  var r = parseInt(hex.slice(0, 2), 16),
    g = parseInt(hex.slice(2, 4), 16),
    b = parseInt(hex.slice(4, 6), 16);
  if (bw) {
    // http://stackoverflow.com/a/3943023/112731
    return (r * 0.299 + g * 0.587 + b * 0.114) > 186
      ? '#000000'
      : '#FFFFFF';
  }
  // invert color components
  r = (255 - r).toString(16);
  g = (255 - g).toString(16);
  b = (255 - b).toString(16);
  // pad each with zeros and return
  return "#" + padZero(r) + padZero(g) + padZero(b);

  const padZero = (str, len) => {
    len = len || 2;
    var zeros = new Array(len).join('0');
    return (zeros + str).slice(-len);
  }
}
export const limit = (val, min, max) => {
  if (val < min) {
    return min;
  } else if (val > max) {
    return max;
  } else {
    return val;
  }
}
export const getDataType = (val) => {
  switch (val) {
    case "infections":
      return "cases";
    case "deaths":
      return "deaths";
    case "testing":
      return "tests";
    default:
      return "cases";
  }
}
export const everyDay = (val) => {
  let text = "day";
  if (val !== "1") {
    text = `   (every ${val} ${text}s)`;
  } else {
    text = `   (every ${text})`;
  }
  return text;
}
