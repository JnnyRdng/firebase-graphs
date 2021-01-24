import { useState } from "react"
import "./Settings.css";
import { Button, Slider } from "../ui/UIElements";

export default function Settings({ vars }) {

  const [hidden, setHidden] = useState(false);
  const [arrow, setArrow] = useState("<");
  return (
    <div
      id="settings-box"
      style={{ left: hidden ? -770 : 0 }}
    >
      <div id="controls">
        <Button size="small" text="button" click={() => true} />
        <Slider />
      </div>
      <div id="arrow_click" onClick={() => {
        setHidden(!hidden);
        setArrow(arrow === ">" ? "<" : ">");
      }}>
        {arrow}
      </div>
    </div>
  )
}