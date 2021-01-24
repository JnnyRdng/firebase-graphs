import { useState, useEffect } from 'react';
import fire from "./components/firebase/firebase";
import { Button } from "./components/ui/UIElements";
import Page from "./components/page/Page";
import './App.css';

function App() {

  const [view, setView] = useState("uk");
  const [vars, setVars] = useState({});
  const [ukData, setUKData] = useState({});

  useEffect(() => {
    fire.database().ref("vars").on("value", snapshot => {
      setVars(snapshot.val())
    });
    fire.database().ref("data").on("value", snapshot => {
      setUKData(snapshot);
    });
  }, []);

  const serveData = () => {
    if (view === "uk") return ukData;
    return {};
  }

  return (
    <div className="App">
      <header id="header">
        <Button click={() => setView("uk")} text="UK" view={view} size="large" />
        <Button click={() => setView("vaccines")} text="Vaccines" view={view} size="large" />
        <Button click={() => setView("world")} text="World" view={view} size="large" />
      </header>
      {view && (
        <Page view={view} vars={vars} data={serveData()} />
      )}
    </div>
  );
}

export default App;
