export type Action = 'rotate' | 'moveLeft' | 'moveRight' | 'moveDown';

export type AllowedKeyboardEvent =
	| 'ArrowUp'
	| 'ArrowRight'
	| 'ArrowLeft'
	| 'ArrowDown';

export type Stage = number[][];

export interface Block {
	x: number;
	y: number;
}

type PieceName =
	| 'iPiece'
	| 'jPiece'
	| 'lPiece'
	| 'oPiece'
	| 'sPiece'
	| 'tPiece'
	| 'zPiece';

export interface Piece {
	name: PieceName;
	id: number;
	blocks: Block[];
	width: number;
	height: number;
	rotate?: boolean;
}
