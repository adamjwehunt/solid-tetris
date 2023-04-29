import type { Component } from 'solid-js';
import styles from './app.module.css';
import Board from './Board';

const App: Component = () => (
	<main class={styles.app}>
		<Board />
	</main>
);

export default App;
