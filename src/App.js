import { useState } from 'react';
import Page from "./components/page/Page";
import './App.css';

function App() {

  const [view, setView] = useState(undefined);

  return (
    <div className="App">
      <button onClick={() => setView("uk")}>UK</button>
      <button onClick={() => setView("world")}>World</button>
      {view && (
        <Page view={view} />
      )}
    </div>
  );
}

export default App;
