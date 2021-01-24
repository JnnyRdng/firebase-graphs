import { useState, useEffect } from 'react';
import fire from "./components/firebase/firebase";
import Settings from "./components/settings/Settings";
import { Button, Slider } from "./components/ui/UIElements";
import Page from "./components/page/Page";
import './App.css';

function App() {

  const [view, setView] = useState("uk");
  const [data, setData] = useState({});
  const [vars, setVars] = useState({});

  useEffect(() => {
    fire.database().ref(view).on("value", snapshot => {
      setData(snapshot.val().data);
      setVars(snapshot.val().vars);
    });
  }, [view]);

  return (
    <div className="App">
      <header id="header">
        <Button click={() => setView("uk")} text="UK" view={view} size="large" />
        {/* <Button click={() => setView("vaccines")} text="Vaccines" view={view} size="large" /> */}
        <Button click={() => setView("world")} text="World" view={view} size="large" />
      </header>
      <Page view={view} data={data} />
      <Settings vars={vars} />
    </div>
  );
}

export default App;
