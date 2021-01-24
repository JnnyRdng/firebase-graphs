import { useState, useEffect } from 'react';
import fire from "./components/firebase/firebase";
import Button from "./components/ui/Button";
import Page from "./components/page/Page";
import './App.css';

function App() {

  const [view, setView] = useState("uk");
  const [vars, setVars] = useState({});

  useEffect(() => {
    fire.database().ref("vars").on("value", snapshot => {
      setVars(snapshot.val())
    })
  }, [])

  return (
    <div className="App">
      <header id="header">
        <Button click={() => setView("uk")} text="UK" view={view} size="large" />
        <Button click={() => setView("world")} text="World" view={view} size="large" />
      </header>
      {view && (
        <Page view={view} vars={vars} />
      )}
    </div>
  );
}

export default App;
