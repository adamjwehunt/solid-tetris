import { For } from 'solid-js';
import Block from '../Block';
import styles from './row.module.css';

interface RowProps {
	row: number[];
}

const Row = ({ row }: RowProps) => (
	<div class={styles.row}>
		<For each={row}>{(block) => <Block block={block} />}</For>
	</div>
);

export default Row;
