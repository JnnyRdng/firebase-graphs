import { useEffect, useState } from 'react';
import "./Page.css";
import Graph from "./Graph";
export default function Page({ view, vars }) {

  // const [vars, setVars] = useState(undefined);

  useEffect(() => {
    // firebase.vars().on("value", snapshot => {
    //   setVars(snapshot.val());
    // });
  }, []);

  return (
    <div id="contents">
      <h2>{view.toUpperCase()}</h2>
      <p>{JSON.stringify(vars)}</p>
      <Graph />
    </div>
  )
}