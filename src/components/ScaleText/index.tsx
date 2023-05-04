import { Accessor, JSX } from 'solid-js';
import classNames from 'classnames';
import styles from './scaleText.module.css';

interface TextProps extends ScaleTextProps {
	style?: JSX.CSSProperties;
}

const textPositionX = {
	inherit: '50%',
	start: '0',
	middle: '10',
	end: '20',
};

const Text = ({ className, text, textAnchor = 'start' }: TextProps) => (
	<div class={className}>
		<div class={styles.svgWrapper}>
			<svg viewBox={'0 0 20 20'}>
				<text x={textPositionX[textAnchor]} y={'15'} text-anchor={textAnchor}>
					{typeof text === 'string' || typeof text === 'number' ? text : text()}
				</text>
			</svg>
		</div>
	</div>
);

type Shadow = 'single' | 'multi';
interface ScaleTextProps {
	text: (string | number) | Accessor<string | number>;
	className?: string;
	textClassName?: string;
	textAnchor?: JSX.PresentationSVGAttributes['text-anchor'];
	shadow?: Shadow;
}

export const ScaleText = ({
	className,
	textClassName,
	shadow,
	...props
}: ScaleTextProps) => (
	<div class={className}>
		<div class={styles.textContainer}>
			<Text className={classNames(styles.text, textClassName)} {...props} />
			{!shadow ? null : (
				<>
					<Text className={styles.shadow} {...props} />
					{shadow !== 'multi' ? null : (
						<>
							<Text className={styles.shadow2} {...props} />
							<Text className={styles.shadow3} {...props} />
						</>
					)}
				</>
			)}
		</div>
	</div>
);
