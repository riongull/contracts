import type { Component } from "solid-js";

import logo from "./logo.svg";
import styles from "./App.module.css";
import { RegisterForm } from "./components/RegisterForm";

const App: Component = () => {
  return (
    <div class={styles.App}>
      <header class={styles.header}>
        <img src={logo} class={styles.logo} alt="logo" />
      </header>
      <a
        class={styles.link}
        href="https://github.com/dashpay/dashplatform"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn about Dash Platform
      </a>
      <p class={styles.register}>Register a Dash Platform Name.</p>
      <RegisterForm />
    </div>
  );
};

export default App;
