import { useEffect, useState } from 'react';
import "./Page.css";
import Graph from "./Graph";
import SpreadSheet from "../spreadsheet/SpreadSheet";
export default function Page({ view, vars, data, whichCountry }) {

  // const [vars, setVars] = useState(undefined);

  useEffect(() => {
    // firebase.vars().on("value", snapshot => {
    //   setVars(snapshot.val());
    // });
  }, []);

  return (
    <div id="contents">
      <h2>{view.toUpperCase()}</h2>
      {/* <p>{JSON.stringify(vars)}</p> */}
      <main>
        {/* <p>{JSON.stringify(data, null, 2)}</p> */}
        <Graph />
        <SpreadSheet data={data} whichCountry={whichCountry} />
      </main>
    </div>
  )
}