import {
	batch,
	createEffect,
	createSignal,
	onCleanup,
	onMount,
} from 'solid-js';
import { Action, AllowedKeyboardEvent } from './types';
import { createScheduled, throttle } from '@solid-primitives/scheduled';

const THROTTLE_HORIZONTAL_MOVE_MS = 10;
const DOWN_MOVE_INTERVAL_MS = 50;
const MOVE_BUFFER_PX = 5;

export default function eventHandler(onAction: (action: Action) => void) {
	const [touchPosition, setTouchPosition] = createSignal({ x: 0, y: 0 });
	const [isDragging, setIsDragging] = createSignal(false);
	const [isMovingDown, setIsMovingDown] = createSignal(false);
	let moveDownInterval: number | undefined;

	onMount(() => {
		document.addEventListener('touchstart', onTouchStart, { passive: false });
		document.addEventListener('mousedown', onMouseDown);
		document.addEventListener('keydown', onKeyDown);
	});

	createEffect(onMoveDown);

	onCleanup(() => {
		document.removeEventListener('touchstart', onTouchStart);
		document.removeEventListener('mousedown', onMouseDown);
		document.removeEventListener('keydown', onKeyDown);
		clearInterval(moveDownInterval);
	});

	const throttledLateralMove = createScheduled((fn) =>
		throttle(fn, THROTTLE_HORIZONTAL_MOVE_MS)
	);

	function onMove(movementX: number, movementY: number) {
		if (throttledLateralMove() && Math.abs(movementX) > Math.abs(movementY)) {
			if (movementX > MOVE_BUFFER_PX) {
				onAction('moveRight');
				batch(() => {
					setIsDragging(true);
					setIsMovingDown(false);
				});
			} else if (movementX < -MOVE_BUFFER_PX) {
				onAction('moveLeft');
				batch(() => {
					setIsDragging(true);
					setIsMovingDown(false);
				});
			}
		}

		if (
			Math.abs(movementY) > Math.abs(movementX) &&
			movementY > MOVE_BUFFER_PX
		) {
			batch(() => {
				setIsDragging(true);
				setIsMovingDown(true);
			});
		}
	}

	function onMoveDown() {
		if (!isMovingDown()) {
			clearInterval(moveDownInterval);
			return;
		}

		moveDownInterval = setInterval(() => {
			onAction('moveDown');
		}, DOWN_MOVE_INTERVAL_MS);
	}

	function onEndMove() {
		if (!isDragging()) {
			onAction('rotate');
		} else {
			batch(() => {
				setIsDragging(false);
				if (isMovingDown()) {
					setIsMovingDown(false);
				}
			});
		}
	}

	function onKeyDown(event: KeyboardEvent) {
		const keyboardEvents: { [key in AllowedKeyboardEvent]?: Action } = {
			ArrowUp: 'rotate',
			ArrowRight: 'moveRight',
			ArrowLeft: 'moveLeft',
			ArrowDown: 'moveDown',
		};

		const action = keyboardEvents[event.key as AllowedKeyboardEvent];
		if (action) {
			onAction(action);
		}
	}

	function onMouseDown() {
		document.addEventListener('mousemove', onMouseMove, { passive: false });
		document.addEventListener('mouseup', onMouseUp, { passive: false });
	}

	function onMouseMove(event: MouseEvent) {
		const { movementX, movementY } = event;
		onMove(movementX, movementY);
	}

	function onMouseUp() {
		onEndMove();
		document.removeEventListener('mousemove', onMouseMove);
		document.removeEventListener('mouseup', onMouseUp);
	}

	function onTouchStart(event: TouchEvent) {
		event.preventDefault();
		const { clientX, clientY } = event.touches[0];
		setTouchPosition({ x: clientX, y: clientY });

		document.addEventListener('touchmove', onTouchMove, { passive: false });
		document.addEventListener('touchend', onTouchEnd, { passive: false });
		document.addEventListener('touchcancel', onTouchEnd, { passive: false });
	}

	function onTouchMove(event: TouchEvent) {
		event.preventDefault();
		const { clientX, clientY } = event.touches[0];
		const { x, y } = touchPosition();
		onMove(clientX - x, clientY - y);
	}

	function onTouchEnd() {
		onEndMove();
		document.removeEventListener('touchmove', onTouchMove);
		document.removeEventListener('touchend', onTouchEnd);
		document.removeEventListener('touchcancel', onTouchEnd);
	}
}
