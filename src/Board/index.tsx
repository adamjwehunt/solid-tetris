import { For, onMount } from 'solid-js';
import boardState from '../boardState';
import Row from './Row';
import styles from './board.module.css';
import { Score } from './Score';

const Board = () => {
	let boardRef: HTMLDivElement | undefined;
	onMount(() => {
		boardRef?.focus();
	});

	const { display, score, onKeyDown } = boardState();

	return (
		<div class={styles.boardWrapper}>
			<Score score={score} />
			<div
				ref={boardRef}
				class={styles.board}
				tabIndex={0}
				onKeyDown={onKeyDown}
			>
				<For each={display()}>{(row) => <Row row={row} />}</For>
			</div>
			<div class={styles.boardShadow} />
		</div>
	);
};

export default Board;
