import React from "react";
import Weather from "./Weather";

import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <div className="wrapper">
        <Weather />
        <footer>
          <div className="copyright">
            © Create by_
            <a
              rel="noreferrer"
              href="https://www.linkedin.com/in/nataliia-dorosh/"
              title="Profile Nataliia Dorosh"
              target="_blank"
            >
              Nataliia Dorosh
            </a>
            _2022
          </div>
        </footer>
      </div>
    </div>
  );
}