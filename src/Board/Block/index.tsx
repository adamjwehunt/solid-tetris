import classnames from 'classnames';
import styles from './block.module.css';

interface BlockProps {
	block: number;
}

const Block = ({ block }: BlockProps) => (
	<span class={classnames(styles.block, styles[`block-${block ?? 0}`])} />
);

export default Block;
