import { ScaleText } from '../../components/ScaleText';
import styles from './banner.module.css';

const scaleTextProps = {
	className: styles.bannerText,
	textAnchor: 'middle' as const,
	shadow: 'multi' as const,
};

interface BannerProps {
	topText: string;
	bottomText: string;
}

export const Banner = ({ topText, bottomText }: BannerProps) => (
	<div>
		<ScaleText {...scaleTextProps} text={topText} />
		<ScaleText {...scaleTextProps} text={bottomText} />
	</div>
);
