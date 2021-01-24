import { useState } from "react"
import "./Settings.css";
import { Button, Slider } from "../ui/UIElements";

export default function Settings({ vars, options, setWhichCountry, type, setType }) {

  const [hidden, setHidden] = useState(false);
  const [arrow, setArrow] = useState("<");

  return (
    <div
      id="settings-box"
      style={{ left: hidden ? -770 : 0 }}
    >
      <div id="controls">
        {
          vars.headings.map(heading => (
            <Button key={heading} text={heading} click={() => setType(heading)} view={type} />
          ))
        }
        {options.length > 0 &&
          (
            <>
              <label htmlFor="data_select">Country: </label>
              <select id="data_select" onChange={({ target }) => setWhichCountry(target.value)}>
                {options.map(option => <option key={option} value={option} >{option}</option>)}
              </select>
            </>
          )
        }
      </div>
      <div
        id="arrow_click"
        onClick={() => {
          setHidden(!hidden);
          setArrow(arrow === ">" ? "<" : ">");
        }}
      >
        {arrow}
      </div>
    </div>
  )
}