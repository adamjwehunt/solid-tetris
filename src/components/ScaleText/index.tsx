import { Accessor } from 'solid-js';
import styles from './scaleText.module.css';

type Align = 'left' | 'right';

interface ScaleTextProps {
	text: (string | number) | Accessor<string | number>;
	className?: string;
	align?: Align;
}

export const ScaleText = ({
	className,
	text,
	align = 'left',
}: ScaleTextProps) => (
	<div class={className}>
		<div class={styles.svgWrapper}>
			<svg viewBox={'0 0 20 20'}>
				<text
					x={align === 'left' ? '0' : '20'}
					y={'15'}
					text-anchor={align === 'left' ? 'start' : 'end'}
				>
					{typeof text === 'string' || typeof text === 'number' ? text : text()}
				</text>
			</svg>
		</div>
	</div>
);
