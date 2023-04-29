import { For } from 'solid-js';
import createBoardState from '../createBoardState';
import Row from './Row';
import styles from './board.module.css';

const Board = () => {
	const { display, score, onKeyDown } = createBoardState();

	return (
		<div class={styles.board} tabIndex={0} onKeyDown={onKeyDown}>
			<div class={styles.border} />
			<div class={styles.score}>{score()}</div>
			<For each={display()}>{(row) => <Row row={row} />}</For>
		</div>
	);
};

export default Board;
