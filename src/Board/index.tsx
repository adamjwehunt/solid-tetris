import { For, onMount } from 'solid-js';
import Row from './Row';
import useBoard from '../useBoard';
import { Score } from './Score';
import styles from './board.module.css';

const Board = () => {
	let boardRef: HTMLDivElement | undefined;

	onMount(() => {
		boardRef?.focus();
	});

	const { display, score } = useBoard();

	return (
		<div ref={boardRef} class={styles.boardWrapper} tabIndex={0}>
			<Score score={score} />
			<div class={styles.board}>
				<For each={display()}>{(row) => <Row row={row} />}</For>
			</div>
			<div class={styles.boardShadow} />
		</div>
	);
};

export default Board;
