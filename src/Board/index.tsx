import { For, onMount } from 'solid-js';
import Row from './Row';
import tetris from '../tetris';
import { WelcomeView } from './WelcomeView';
import { GameOverView } from './GameOverView';
import { LinesCleared } from './LinesCleared';
import styles from './board.module.css';

const Board = () => {
	let boardRef: HTMLDivElement | undefined;

	onMount(() => {
		boardRef?.focus();
	});

	const { display, linesClearedCount, isGameOver, hasGameStarted, startGame } =
		tetris();

	return (
		<div ref={boardRef} class={styles.boardWrapper} tabIndex={0}>
			{!hasGameStarted() ? (
				<WelcomeView startGame={startGame} />
			) : isGameOver() ? (
				<GameOverView
					startGame={startGame}
					linesClearedCount={linesClearedCount}
				/>
			) : (
				<>
					<LinesCleared linesClearedCount={linesClearedCount} />
					<div class={styles.board}>
						<For each={display()}>{(row) => <Row row={row} />}</For>
					</div>
				</>
			)}
			<div class={styles.boardShadow} />
		</div>
	);
};

export default Board;
