import { HotTable } from '@handsontable/react';
import 'handsontable/dist/handsontable.full.css';
import "./SpreadSheet.css";
import { useEffect, useState } from 'react';

export default function SpreadSheet({ data, whichCountry, type }) {

  useEffect(() => {

  }, [data]);

  // bring this into a helper and use in App
  const reformatForTable = (data) => {
    const d = JSON.parse(JSON.stringify(data));
    return Object.keys(d).map(key => {
      return d[key];
    });
  }

  const settings = {
    data: reformatForTable(data),
    columns: [
      { data: 'date', type: 'date', dateFormat: 'DD/MM/YYYY' },
      { data: type, type: "numeric" },
      { data: `showVal.${type}`, type: "checkbox", checkedTemplate: 1, uncheckedTemplate: 0 },
    ],
    stretchH: "all",
    height: "75%",
    width: 400,
    contextMenu: true,
    rowHeaders: false,
    colHeaders: ["date", type, `show ${type}`],
    licenseKey: 'non-commercial-and-evaluation',
    minSpareRows: 1,
    beforePaste: function (changes, source) {
      //loop through the rows
      for (let i = 0; i < changes.length; i++) {
        // loop through the cells in each row
        for (let j = 0; j < changes[i].length; j++) {
          let cell = changes[i][j];
          //trim off whitespace
          // cell.trim();

          let regex = /^((\d{0,3},){0,5})(\d{0,3})$/gm;
          if (cell.match(regex)) {
            changes[i][j] = Number(cell.toString().replace(/,/g, ""));
          }
        }
      }
    }
  }
  const formatName = (name) => {
    name = name.replace(/_/g, " ");
    return name.split(" ").map(word => word[0].toUpperCase() + word.slice(1)).join(" ");
  }

  return (
    <div>
      <h2 id="spreadsheet_title">{formatName(whichCountry)}</h2>
      <HotTable className="spreadsheet" settings={settings} />
    </div>
  );
}