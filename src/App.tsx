import type { Component } from 'solid-js';
import { COLUMN_COUNT, ROW_COUNT } from './tetris';
import Board from './Board';
import { inject } from '@vercel/analytics';
import styles from './app.module.css';

inject();

const App: Component = () => (
	<main
		class={styles.app}
		style={{ '--column-count': COLUMN_COUNT, '--row-count': ROW_COUNT }}
	>
		<Board />
	</main>
);

export default App;
