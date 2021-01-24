import { useState, useEffect } from 'react';
import fire from "./components/firebase/firebase";
import Settings from "./components/settings/Settings";
import { Button, Slider } from "./components/ui/UIElements";
import Page from "./components/page/Page";
import './App.css';

function App() {

  const [view, setView] = useState("uk");
  const [ukVars, setUKVars] = useState({});
  const [ukData, setUKData] = useState({});
  const [worldVars, setWorldVars] = useState({});
  const [worldData, setWorldData] = useState({});

  useEffect(() => {
    fire.database().ref("uk").on("value", snapshot => {
      setUKData(snapshot.val().data);
      setUKVars(snapshot.val().vars);
    });
    fire.database().ref("world").on("value", snapshot => {
      setWorldData(snapshot.val().data);
      setWorldVars(snapshot.val().vars);
    });
    // fire.database().ref("data").on("value", snapshot => {
    //   setUKData(snapshot);
    // });
  }, []);

  return (
    <div className="App">
      <header id="header">
        <Button click={() => setView("uk")} text="UK" view={view} size="large" />
        <Button click={() => setView("vaccines")} text="Vaccines" view={view} size="large" />
        <Button click={() => setView("world")} text="World" view={view} size="large" />
      </header>
      {view === "uk" && <Page view={view} data={ukData} />}
      {/* {view === "vaccines" && <Page view={view} data={{}} />} */}
      {/* {view === "world" && <Page view={view} data={{}} />} */}
      <Settings />
    </div>
  );
}

export default App;
