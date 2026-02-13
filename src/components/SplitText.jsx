import { useMemo } from 'react';
import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';

export default function SplitText({
    children,
    text,
    className = '',
    delay = 0,
    duration = 0.5,
    staggerChildren = 0.05,
    once = true,
    animation = 'fadeUp', // 'fadeUp', 'fadeIn', 'slideIn'
    splitBy = 'letter' // 'letter' or 'word' - words = fewer DOM elements = better perf
}) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once, margin: '-50px' });

    const content = text || children;

    const segments = useMemo(() => {
        if (typeof content !== 'string') return [];
        if (splitBy === 'word') {
            return content.split(' ');
        }
        return content.split('');
    }, [content, splitBy]);

    const getAnimation = () => {
        switch (animation) {
            case 'fadeUp':
                return {
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                };
            case 'fadeIn':
                return {
                    hidden: { opacity: 0 },
                    visible: { opacity: 1 }
                };
            case 'slideIn':
                return {
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0 }
                };
            default:
                return {
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                };
        }
    };

    const variants = getAnimation();

    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: splitBy === 'word' ? staggerChildren * 2 : staggerChildren,
                delayChildren: delay
            }
        }
    };

    const segmentVariants = {
        hidden: variants.hidden,
        visible: {
            ...variants.visible,
            transition: {
                duration,
                ease: [0.22, 1, 0.36, 1] // Custom easing for smooth feel
            }
        }
    };

    return (
        <motion.span
            ref={ref}
            className={`split-text ${className}`}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            aria-label={content}
            style={{ display: 'inline-block' }}
        >
            {segments.map((segment, index) => (
                <motion.span
                    key={index}
                    variants={segmentVariants}
                    style={{
                        display: 'inline-block',
                        whiteSpace: segment === ' ' ? 'pre' : 'normal',
                        willChange: 'transform, opacity' // GPU acceleration hint
                    }}
                >
                    {splitBy === 'word'
                        ? (index < segments.length - 1 ? segment + '\u00A0' : segment)
                        : (segment === ' ' ? '\u00A0' : segment)
                    }
                </motion.span>
            ))}
        </motion.span>
    );
}
