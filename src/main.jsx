import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "../style.css";

export function renderApp() {
  createRoot(document.getElementById("root")).render(<App />);
}
