import { useRef } from 'react';
import './ShinyText.css';

export default function ShinyText({
    children,
    text,
    className = '',
    textColor = '#F5F0E1',
    shineColor = '#C49A3C',
    speed = 3,
    spread = 90,
    disabled = false
}) {
    const ref = useRef(null);

    const animationStyle = {
        '--text-color': textColor,
        '--shine-color': shineColor,
        '--speed': `${speed}s`,
        '--spread': `${spread}deg`,
    };

    return (
        <span
            ref={ref}
            className={`shiny-text ${disabled ? 'disabled' : ''} ${className}`}
            style={animationStyle}
        >
            {children || text}
        </span>
    );
}
