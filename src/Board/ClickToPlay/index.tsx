import { ScaleText } from '../../components/ScaleText';
import styles from './clickToPlay.module.css';

const CLICK_TO_PLAY_TEXT = '* click to play * ';

export const ClickToPlay = () => {
	return (
		<ScaleText
			className={styles.playAgain}
			textClassName={styles.playAgainText}
			textAnchor={'middle'}
			text={CLICK_TO_PLAY_TEXT}
		/>
	);
};
