import { onMount, onCleanup } from 'solid-js';
import { Banner } from '../Banner';
import { ClickToPlay } from '../ClickToPlay';
import styles from './welcomeView.module.css';

const TOP_TEXT = 'play';
const BOTTOM_TEXT = 'tetris';

interface WelcomeViewProps {
	startGame: () => void;
}

export const WelcomeView = ({ startGame }: WelcomeViewProps) => {
	onMount(() => {
		document.addEventListener('click', startGame);
		document.addEventListener('keyup', startGame);
		document.addEventListener('touchend', startGame);
	});
	onCleanup(() => {
		document.removeEventListener('click', startGame);
		document.removeEventListener('keyup', startGame);
		document.removeEventListener('touchend', startGame);
	});

	return (
		<div class={styles.container}>
			<Banner topText={TOP_TEXT} bottomText={BOTTOM_TEXT} />
			<ClickToPlay />
		</div>
	);
};
