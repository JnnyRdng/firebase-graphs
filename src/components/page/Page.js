import "./Page.css";
import Graph from "./Graph";
import SpreadSheet from "../spreadsheet/SpreadSheet";
export default function Page({ view, vars, data, whichCountry, type }) {


  // bring this into a helper and use in App
  const reformatForTable = (data) => {
    const d = JSON.parse(JSON.stringify(data));
    return Object.keys(d).map(key => {
      return d[key];
    });
  }


  return (
    <div id="contents">
      <h2>{view.toUpperCase()}</h2>
      <main>
        <Graph data={reformatForTable(data)} vars={vars} type={type} />
        <SpreadSheet data={data} whichCountry={whichCountry} type={type} />
      </main>
    </div>
  )
}