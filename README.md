# SolidJs Tetris 

This documentation describes how to use the Tetris game built with SolidJs and TypeScript. The game is created using two primary classes, `tetris` and `eventHandler`, and various helper functions and types.

## Getting Started

First, install the necessary dependencies:

```bash
$ npm install # or pnpm install or yarn install
```

In the project directory, you can run:

### `npm dev` or `npm start`

Runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser. The page will reload if you make edits.

### `npm run build`

Builds the app for production to the `dist` folder. It correctly bundles Solid in production mode and optimizes the build for the best performance. The build is minified and the filenames include the hashes. Your app is ready to be deployed!

## Deployment

You can deploy the `dist` folder to any static host provider (netlify, surge, now, etc.)

## Modules

### Tetris

This is the main module of the game, controlling the primary game logic.

```typescript
function tetris() {...}
```

#### Properties

- `stage`: Represents the current game state (i.e., where all the pieces are).
- `piece`: Represents the current game piece.
- `position`: The current position of the game piece.
- `linesClearedCount`: Tracks the number of lines cleared in the game.
- `isGameOver`: Indicates whether the game is over.
- `hasGameStarted`: Indicates whether the game has started.

#### Methods

- `startGame()`: This function initializes and starts the game.
- `tick()`: This function moves the piece downwards, or if it is not possible, places the piece on the board and prepares the next piece.
- `rotatePiece()`: This function rotates the current piece.
- `movePosition({ x, y }: Block)`: This function moves the current piece to a new position.

### EventHandler

This module handles user input for controlling the game pieces.

```typescript
function eventHandler(onAction: (action: Action) => void) {...}
```

#### Methods

- `onKeyDown(event: KeyboardEvent)`: This function handles keyboard events for game control.
- `onMouseMove(event: MouseEvent)`: This function handles mouse move events for game control.
- `onTouchMove(event: TouchEvent)`: This function handles touch move events for game control.

## Types

This game uses several types to keep track of various elements.

```typescript
export type Action = 'rotate' | 'moveLeft' | 'moveRight' | 'moveDown';
export type AllowedKeyboardEvent = 'ArrowUp' | 'ArrowRight' | 'ArrowLeft' | 'ArrowDown';
export type Stage = number[][];
export interface Block { x: number; y: number; }
export interface Piece {...}
```

## How to Play

1. Call the `startGame` function to start a new game.
2. Use the Arrow keys to control the game pieces:
   - ArrowUp to rotate the current piece.
   - ArrowRight to move the current piece to the right.
   - ArrowLeft to move the current piece to the left.
   - ArrowDown to move the current piece down faster.
3. The game ends when a new piece cannot be placed on the board.

Note: With a mouse or touch device, you can drag to move the pieces and click/tap to rotate them. (I plan on tweaking the mouse mechanics, and touch needs some attention.)

# Enjoy!
