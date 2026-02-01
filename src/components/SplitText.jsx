import { useMemo } from 'react';
// eslint-disable-next-line no-unused-vars
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
    animation = 'fadeUp' // 'fadeUp', 'fadeIn', 'slideIn'
}) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once, margin: '-50px' });

    const content = text || children;

    const letters = useMemo(() => {
        if (typeof content !== 'string') return [];
        return content.split('');
    }, [content]);

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
                staggerChildren,
                delayChildren: delay
            }
        }
    };

    const letterVariants = {
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
            {letters.map((letter, index) => (
                <motion.span
                    key={index}
                    variants={letterVariants}
                    style={{
                        display: 'inline-block',
                        whiteSpace: letter === ' ' ? 'pre' : 'normal'
                    }}
                >
                    {letter === ' ' ? '\u00A0' : letter}
                </motion.span>
            ))}
        </motion.span>
    );
}
