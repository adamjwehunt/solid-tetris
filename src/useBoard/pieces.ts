import { Piece } from './types';

const pieces: Piece[] = [
	{
		name: 'iPiece',
		id: 1,
		blocks: [
			{ x: 0, y: 0 },
			{ x: 1, y: 0 },
			{ x: 2, y: 0 },
			{ x: 3, y: 0 },
		],
		width: 4,
		height: 1,
	},
	{
		name: 'jPiece',
		id: 2,
		blocks: [
			{ x: 0, y: 0 },
			{ x: 0, y: 1 },
			{ x: 1, y: 1 },
			{ x: 2, y: 1 },
		],
		width: 3,
		height: 1,
	},
	{
		name: 'lPiece',
		id: 3,
		blocks: [
			{ x: 2, y: 0 },
			{ x: 0, y: 1 },
			{ x: 1, y: 1 },
			{ x: 2, y: 1 },
		],
		width: 3,
		height: 1,
	},
	{
		name: 'oPiece',
		id: 4,
		blocks: [
			{ x: 0, y: 0 },
			{ x: 0, y: 1 },
			{ x: 1, y: 0 },
			{ x: 1, y: 1 },
		],
		width: 2,
		height: 2,
		rotate: false,
	},
	{
		name: 'sPiece',
		id: 5,
		blocks: [
			{ x: 1, y: 0 },
			{ x: 2, y: 0 },
			{ x: 1, y: 1 },
			{ x: 0, y: 1 },
		],
		width: 3,
		height: 2,
	},
	{
		name: 'tPiece',
		id: 6,
		blocks: [
			{ x: 1, y: 0 },
			{ x: 2, y: 1 },
			{ x: 1, y: 1 },
			{ x: 0, y: 1 },
		],
		width: 3,
		height: 2,
	},
	{
		name: 'zPiece',
		id: 7,
		blocks: [
			{ x: 0, y: 0 },
			{ x: 1, y: 0 },
			{ x: 2, y: 1 },
			{ x: 1, y: 1 },
		],
		width: 3,
		height: 2,
	},
];

export function getRandomPiece() {
	return pieces[Math.floor(Math.random() * pieces.length)];
}
