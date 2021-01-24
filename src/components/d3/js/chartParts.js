// easy testing data
export const data = [
  {
    "date": "12/12/2020",
    "cases": 1862440,
    "deaths": 64025,
    "tests": 201243,
    "showVal": {
      "cases": 0,
      "deaths": 0,
      "tests": 1
    }
  },
  {
    "date": "13/12/2020",
    "cases": 1880887,
    "deaths": 64169,
    "tests": null,
    "showVal": {
      "cases": 0,
      "deaths": 0,
      "tests": null
    }
  },
  {
    "date": "14/12/2020",
    "cases": 1901150,
    "deaths": 64402,
    "tests": null,
    "showVal": {
      "cases": 0,
      "deaths": 0,
      "tests": null
    }
  },
  {
    "date": "15/12/2020",
    "cases": 1919600,
    "deaths": 64908,
    "tests": null,
    "showVal": {
      "cases": 1,
      "deaths": 0,
      "tests": null
    }
  },
  {
    "date": "16/12/2020",
    "cases": 1944761,
    "deaths": 65520,
    "tests": null,
    "showVal": {
      "cases": 1,
      "deaths": 1,
      "tests": null
    }
  },
  {
    "date": "17/12/2020",
    "cases": 1980144,
    "deaths": 66052,
    "tests": null,
    "showVal": {
      "cases": 0,
      "deaths": 0,
      "tests": null
    }
  },
  {
    "date": "18/12/2020",
    "cases": 2008651,
    "deaths": 66541,
    "tests": null,
    "showVal": {
      "cases": 0,
      "deaths": null,
      "tests": null
    }
  },
  {
    "date": "19/12/2020",
    "cases": 2035703,
    "deaths": 67075,
    "tests": null,
    "showVal": {
      "cases": 0,
      "deaths": 0,
      "tests": null
    }
  },
  {
    "date": "20/12/2020",
    "cases": 2071631,
    "deaths": 67401,
    "tests": null,
    "showVal": {
      "cases": 0,
      "deaths": 0,
      "tests": null
    }
  },
  {
    "date": "21/12/2020",
    "cases": 2104995,
    "deaths": 67616,
    "tests": null,
    "showVal": {
      "cases": 0,
      "deaths": 1,
      "tests": null
    }
  }
]


export const movingAverage = (data, difference, windowSize = 7) => {


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

export const getColours = (type) => {
  const colours = {
    deaths: { colour: "#EF1212", lighterColour: "#FFB0B0" },
    cases: { colour: "#FFCC00", lighterColour: "#FFCC00" },
    tests: { colour: "#71B749", lighterColour: "#71B749" },
  };
  return colours[type];
}
export const getDifference = (data, type) => {
  const difference = [];
  for (let i = 1; i < data.length; i++) {
    // console.log(data[i][type])
    difference.push(data[i][type] - data[i - 1][type]);
    // difference.push(data[i].deaths - data[i-1].deaths);
  }
  return difference;
  // const diff = data.map((d, i, arr) => {
  //   if (!arr[i - 1]) return undefined;
  //   return d[type] - arr[i - 1][type];
  // }).filter(d => d);
  // console.log("diff", diff);
  // return diff;
}