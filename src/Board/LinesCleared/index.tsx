import { Accessor } from 'solid-js';
import { ScaleText } from '../../components/ScaleText';
import styles from './linesCleared.module.css';

interface LinesClearedProps {
	linesClearedCount: Accessor<number>;
}

export const LinesCleared = ({ linesClearedCount }: LinesClearedProps) => (
	<ScaleText
		className={styles.linesClearedText}
		textAnchor={'end'}
		text={linesClearedCount}
		shadow={'single'}
	/>
);
