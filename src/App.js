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
            © Create by {" "}
            <a
              rel="noreferrer"
              href="https://www.linkedin.com/in/nataliia-dorosh/"
              title="Profile Nataliia Dorosh"
              target="_blank"
            >
              Nataliia Dorosh
            </a>
            {" "} 2022 {" "} *
            <a href="https://github.com/Niki313/react-week-6-homework.git" rel="noreferrer" title="Link to GitHub" target="_blank">GitHub</a>
            *
          </div>
        </footer>
      </div>
    </div>
  );
}