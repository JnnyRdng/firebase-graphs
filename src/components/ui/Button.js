import "./Button.css";

export default function Button({ view, text, click, size }) {

  const isCurrent = () => {
    return (text.toLowerCase() === view) ? "current" : "";
  }

  const isSize = () => {
    return size === "large" ? "ui-button-large" : "ui-button-small";
  }

  return (
    <button
      onClick={() => click()}
      className={`ui-button ${isSize()} ${isCurrent()}`}
    >
      {text}
    </button>
  )
}