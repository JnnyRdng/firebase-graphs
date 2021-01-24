import { useEffect, useState } from 'react';
import "./Page.css";
import Graph from "./Graph";
import SpreadSheet from "./SpreadSheet";
import { Button, Slider } from "../ui/UIElements";
export default function Page({ view, vars, data }) {

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
      <main style={{ backgroundColor: "#ff0000" }}>
        {/* <p>{JSON.stringify(data, null, 2)}</p> */}
        <Graph />
        <SpreadSheet />
      </main>
    </div>
  )
}