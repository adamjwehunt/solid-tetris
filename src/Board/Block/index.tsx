import classnames from 'classnames';
import styles from './block.module.css';

interface BlockProps {
	block: number;
}

const Block = ({ block }: BlockProps) => (
	<div class={classnames(styles.block, styles[`block-${block ?? 0}`])} />
);

export default Block;
