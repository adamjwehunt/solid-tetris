import { COLUMN_COUNT, ROW_COUNT } from '.';
import { Stage, Piece, Block } from './types';

export function createEmptyStage(): Stage {
	return Array.from(Array(ROW_COUNT), () => Array(COLUMN_COUNT).fill(0));
}

export function mergeStage(
	stage: Stage,
	{ id, blocks }: Piece,
	position: Block
): Stage {
	let newStage = [...stage];

	blocks.forEach(({ x, y }) => {
		const { x: newX, y: newY } = getNewPosition(position, { x, y });
		if (isMoveValid(newX, newY)) {
			return;
		}

		newStage = updateStage(newStage, newX, newY, id);
	});

	return newStage;
}

function updateStage(
	stage: Stage,
	x: number,
	y: number,
	pieceId: number
): Stage {
	if (stage[y][x] === pieceId) {
		return stage;
	}

	const newStage = [...stage];
	newStage[y] = [...stage[y]];
	newStage[y][x] = pieceId;

	return newStage;
}

export function getStartingPosition(piece: Piece): Block {
	return { x: Math.floor(COLUMN_COUNT / 2 - piece.width / 2), y: 0 };
}

export function getNewPosition(previousPosition: Block, { x, y }: Block) {
	return { x: x + previousPosition.x, y: y + previousPosition.y };
}

export function isValidPosition(
	position: Block,
	piece: Piece,
	stage: Stage
): boolean {
	return piece.blocks.every(({ x, y }) => {
		const { x: newX, y: newY } = getNewPosition(position, { x, y });
		if (isMoveValid(newX, newY) || stage[newY][newX] !== 0) {
			return false;
		}

		return true;
	});
}

function isMoveValid(x: number, y: number) {
	return x < 0 || y < 0 || x >= COLUMN_COUNT || y >= ROW_COUNT;
}
