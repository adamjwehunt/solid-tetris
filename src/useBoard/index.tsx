import { createSignal, createEffect, onCleanup, batch } from 'solid-js';
import {
	createEmptyStage,
	getNewPosition,
	getStartingPosition,
	isValidPosition,
	mergeStage,
} from './helpers';
import { getRandomPiece } from './pieces';
import { Block, Piece, Action } from './types';
import eventHandler from './eventHandler';

export const COLUMN_COUNT = 10;
export const ROW_COUNT = 20;
const LINE_CLEAR_SCORE = 1;
const TICK_INTERVAL = 800;

function useBoard() {
	const [stage, setStage] = createSignal(createEmptyStage());
	const [piece, setPiece] = createSignal(getRandomPiece());
	const [position, setPosition] = createSignal(getStartingPosition(piece()));
	const [score, setScore] = createSignal(0);

	createEffect(() => removeLine());

	const tickInterval = setInterval(tick, TICK_INTERVAL);
	onCleanup(() => clearInterval(tickInterval));

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

		batch(() => {
			setPiece(newPiece);
			setPosition(getStartingPosition(newPiece));
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
				setScore(
					(previousScore) => previousScore + LINE_CLEAR_SCORE * linesCleared
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
		score,
	};
}

export default useBoard;
