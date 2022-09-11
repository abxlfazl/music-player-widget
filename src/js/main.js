import { dom } from "./jsx";

/** @jsx dom */

function App() {
  return <div></div>;
}

document.getElementById("root").appendChild(<App />);

function handleResize() {
  const vH = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vH", `${vH}px`);
}

handleResize();
window.addEventListener("resize", handleResize);
window.addEventListener("orientationchange", handleResize);
