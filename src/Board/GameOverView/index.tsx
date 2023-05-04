import { Accessor, onCleanup, onMount } from 'solid-js';
import { ScaleText } from '../../components/ScaleText';
import { ClickToPlay } from '../ClickToPlay';
import { Banner } from '../Banner';
import styles from './gameOverView.module.css';

const TOP_TEXT = 'game';
const BOTTOM_TEXT = 'over';
const LINES_CLEARED_TEXT = 'lines cleared';
const LINE_CLEARED_TEXT = 'line cleared';

interface GameOverViewProps {
	startGame: () => void;
	linesClearedCount: Accessor<number>;
}

export const GameOverView = ({
	linesClearedCount,
	startGame,
}: GameOverViewProps) => {
	onMount(() => {
		document.addEventListener('click', startGame);
		document.addEventListener('keydown', startGame);
	});
	onCleanup(() => {
		document.removeEventListener('click', startGame);
		document.removeEventListener('keydown', startGame);
	});

	return (
		<div class={styles.container}>
			<Banner topText={TOP_TEXT} bottomText={BOTTOM_TEXT} />
			<div class={styles.stats}>
				<div class={styles.statsChild}>
					<ScaleText
						className={styles.linesClearedCount}
						textAnchor={'middle'}
						shadow={'single'}
						text={linesClearedCount()}
					/>
					<ScaleText
						className={styles.linesClearedText}
						textClassName={styles.linesClearedTextFill}
						textAnchor={'middle'}
						text={
							linesClearedCount() === 1 ? LINE_CLEARED_TEXT : LINES_CLEARED_TEXT
						}
					/>
				</div>
			</div>
			<ClickToPlay />
		</div>
	);
};
