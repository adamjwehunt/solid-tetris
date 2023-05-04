import type { Component } from 'solid-js';
import { COLUMN_COUNT, ROW_COUNT } from './tetris';
import Board from './Board';
import styles from './app.module.css';

const App: Component = () => (
	<main
		class={styles.app}
		style={{ '--column-count': COLUMN_COUNT, '--row-count': ROW_COUNT }}
	>
		<Board />
	</main>
);

export default App;
