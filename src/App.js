import { useState, useEffect } from 'react';
import fire from "./components/firebase/firebase";
import Settings from "./components/settings/Settings";
import { Button } from "./components/ui/UIElements";
import Page from "./components/page/Page";
import './App.css';

function App() {

  const [view, setView] = useState("uk");
  const [data, setData] = useState({});
  const [vars, setVars] = useState({});
  const [options, setOptions] = useState([]);
  const [whichCountry, setWhichCountry] = useState("");

  useEffect(() => {
    fire.database().ref(view).on("value", snapshot => {
      const snap = snapshot.val();
      setData(snap.data);
      setVars(snap.vars);
      if (view === "world") {
        const keys = Object.keys(snap.data);
        setOptions(keys);
        setWhichCountry(keys[0]);
      } else {
        setOptions([]);
        setWhichCountry("");
      }
    });
  }, [view]);

  return (
    <div className="App">
      <header id="header">
        <Button click={() => setView("uk")} text="UK" view={view} size="large" />
        {/* <Button click={() => setView("vaccines")} text="Vaccines" view={view} size="large" /> */}
        <Button click={() => setView("world")} text="World" view={view} size="large" />
      </header>
      <Page
        view={view}
        data={
          view === "world" ? (data[whichCountry] ? data[whichCountry] : {}) : data
        }
        whichCountry={whichCountry ? whichCountry : "United Kingdom"}
      />
      {Object.keys(vars).length && <Settings vars={vars} options={options} setWhichCountry={setWhichCountry} />}
    </div>
  );
}

export default App;
