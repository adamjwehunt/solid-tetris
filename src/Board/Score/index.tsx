import { Accessor } from 'solid-js';
import { ScaleText } from '../../components/ScaleText';
import styles from './score.module.css';

interface ScoreProps {
	score: Accessor<number>;
}

export const Score = ({ score }: ScoreProps) => (
	<>
		<ScaleText className={styles.score} align={'right'} text={score} />
		<ScaleText className={styles.scoreShadow} align={'right'} text={score} />
	</>
);
