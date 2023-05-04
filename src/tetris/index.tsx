import { createSignal, createEffect, onCleanup, batch } from 'solid-js';
import {
	createEmptyStage,
	getNewPosition,
	getStartingPosition,
	isValidPosition,
	mergeStage,
	unableToPlaceNewPiece,
} from './helpers';
import { getRandomPiece } from './pieces';
import { Block, Piece, Action } from './types';
import eventHandler from './eventHandler';

export const COLUMN_COUNT = 10;
export const ROW_COUNT = 20;
const LINE_CLEAR_COUNT = 1;
const TICK_MS = 600;

function tetris() {
	const [stage, setStage] = createSignal(createEmptyStage());
	const [piece, setPiece] = createSignal(getRandomPiece());
	const [position, setPosition] = createSignal(getStartingPosition(piece()));
	const [linesClearedCount, setLinesClearedCount] = createSignal(0);
	const [isGameOver, setIsGameOver] = createSignal(false);
	const [hasGameStarted, setHasGameStarted] = createSignal(false);
	let tickInterval: number | undefined;

	createEffect(removeLine);

	onCleanup(() => clearInterval(tickInterval));

	function startTick() {
		tickInterval = setInterval(tick, TICK_MS);
	}

	function tick() {
		const previousPosition = position();
		const previousPiece = piece();
		const previousStage = stage();
		const newPosition = getNewPosition(previousPosition, { x: 0, y: 1 });

		if (isValidPosition(newPosition, previousPiece, previousStage)) {
			setPosition(newPosition);
			return;
		}

		setStage(mergeStage(previousStage, previousPiece, previousPosition));
		placeNewPiece();
	}

	function placeNewPiece() {
		const newPiece = getRandomPiece();

		if (unableToPlaceNewPiece(newPiece, stage())) {
			endGame();
			return;
		}

		batch(() => {
			setPiece(newPiece);
			setPosition(getStartingPosition(newPiece));
		});
	}

	function endGame() {
		clearInterval(tickInterval);
		setIsGameOver(true);
	}

	function startGame() {
		batch(() => {
			setHasGameStarted(true);
			setStage(createEmptyStage());
			setPiece(getRandomPiece());
			setPosition(getStartingPosition(piece()));
			setLinesClearedCount(0);
			setIsGameOver(false);
			startTick();
		});
	}

	function removeLine() {
		const newStage = [...stage()];
		let linesCleared = 0;

		for (let y = 0; y < ROW_COUNT; y++) {
			const row = newStage[y];
			if (row.every((block) => block !== 0)) {
				newStage.splice(y, 1);
				newStage.unshift(Array(COLUMN_COUNT).fill(0));
				y--;
				linesCleared++;
			}
		}

		if (linesCleared) {
			batch(() => {
				setLinesClearedCount(
					(previousScore) => previousScore + LINE_CLEAR_COUNT * linesCleared
				);
				setStage(newStage);
			});
		}
	}

	function movePosition({ x, y }: Block) {
		const newPosition = getNewPosition(position(), { x, y });
		if (!isValidPosition(newPosition, piece(), stage())) {
			return;
		}

		setPosition(newPosition);
	}

	function rotatePiece() {
		const currentPiece = piece();
		if (currentPiece.rotate === false) {
			return;
		}

		const center = {
			x: Math.floor(currentPiece.width / 2),
			y: Math.floor(currentPiece.height / 2),
		};

		const newPiece: Piece = {
			...currentPiece,
			blocks: currentPiece.blocks.map(({ x, y }) => ({
				x: center.x - (y - center.y),
				y: center.y + (x - center.x),
			})),
		};

		if (isValidPosition(position(), newPiece, stage())) {
			setPiece(newPiece);
		}
	}

	eventHandler((action: Action) => {
		const actions: {
			[key in Action]: () => void;
		} = {
			rotate: rotatePiece,
			moveRight: () => movePosition({ x: 1, y: 0 }),
			moveLeft: () => movePosition({ x: -1, y: 0 }),
			moveDown: () => movePosition({ x: 0, y: 1 }),
		};

		actions[action]?.();
	});

	return {
		display: () => mergeStage(stage(), piece(), position()),
		linesClearedCount,
		isGameOver,
		hasGameStarted,
		startGame,
	};
}

export default tetris;
