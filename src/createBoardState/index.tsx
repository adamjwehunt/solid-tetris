import { createSignal, createEffect, onCleanup, batch } from 'solid-js';
import {
	createEmptyStage,
	getNewPosition,
	getStartingPosition,
	isValidPosition,
	mergeStage,
} from './helpers';
import { getRandomPiece } from './pieces';
import { KeyActions, AllowedKeys, Block, Piece } from './types';

export const COLUMN_COUNT = 10;
export const ROW_COUNT = 20;
const LINE_CLEAR_SCORE = 1;
const TICK_INTERVAL = 800;

function createBoardState() {
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

	function onKeyDown(event: KeyboardEvent) {
		const keyActions: KeyActions = {
			ArrowUp: rotatePiece,
			ArrowRight: () => movePosition({ x: 1, y: 0 }),
			ArrowLeft: () => movePosition({ x: -1, y: 0 }),
			ArrowDown: () => movePosition({ x: 0, y: 1 }),
		};

		const action = keyActions[event.key as AllowedKeys];
		if (action) {
			event.preventDefault();
			action();
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

	function getDisplay() {
		return mergeStage(stage(), piece(), position());
	}

	return {
		display: () => getDisplay(),
		score,
		onKeyDown,
	};
}

export default createBoardState;
