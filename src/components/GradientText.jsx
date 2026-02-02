import { useState, useCallback, useEffect, useRef } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, useMotionValue, useAnimationFrame, useTransform } from 'motion/react';
import './GradientText.css';

export default function GradientText({
    children,
    className = '',
    colors = ['#F5F0E1', '#C49A3C', '#F5F0E1'], // cream → gold → cream (vintage palette)
    animationSpeed = 3,
    showBorder = false,
    direction = 'horizontal',
    pauseOnHover = false,
    yoyo = true
}) {
    const [isPaused, setIsPaused] = useState(false);
    const [isInView, setIsInView] = useState(false);
    const containerRef = useRef(null);
    const progress = useMotionValue(0);
    const elapsedRef = useRef(0);
    const lastTimeRef = useRef(null);

    const animationDuration = animationSpeed * 1000;

    // Viewport awareness - only animate when visible
    useEffect(() => {
        const element = containerRef.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsInView(entry.isIntersecting);
                // Reset timing when coming back into view
                if (entry.isIntersecting) {
                    lastTimeRef.current = null;
                }
            },
            { threshold: 0.1 }
        );

        observer.observe(element);
        return () => observer.disconnect();
    }, []);

    useAnimationFrame(time => {
        // Skip animation if not in viewport or paused
        if (isPaused || !isInView) {
            lastTimeRef.current = null;
            return;
        }

        if (lastTimeRef.current === null) {
            lastTimeRef.current = time;
            return;
        }

        const deltaTime = time - lastTimeRef.current;
        lastTimeRef.current = time;
        elapsedRef.current += deltaTime;

        if (yoyo) {
            const fullCycle = animationDuration * 2;
            const cycleTime = elapsedRef.current % fullCycle;

            if (cycleTime < animationDuration) {
                progress.set((cycleTime / animationDuration) * 100);
            } else {
                progress.set(100 - ((cycleTime - animationDuration) / animationDuration) * 100);
            }
        } else {
            progress.set((elapsedRef.current / animationDuration) * 100);
        }
    });

    useEffect(() => {
        elapsedRef.current = 0;
        progress.set(0);
    }, [animationSpeed, progress, yoyo]);

    const backgroundPosition = useTransform(progress, p => {
        if (direction === 'horizontal') {
            return `${p}% 50%`;
        } else if (direction === 'vertical') {
            return `50% ${p}%`;
        } else {
            return `${p}% 50%`;
        }
    });

    const handleMouseEnter = useCallback(() => {
        if (pauseOnHover) setIsPaused(true);
    }, [pauseOnHover]);

    const handleMouseLeave = useCallback(() => {
        if (pauseOnHover) setIsPaused(false);
    }, [pauseOnHover]);

    const gradientAngle =
        direction === 'horizontal' ? 'to right' : direction === 'vertical' ? 'to bottom' : 'to bottom right';
    const gradientColors = [...colors, colors[0]].join(', ');

    const gradientStyle = {
        backgroundImage: `linear-gradient(${gradientAngle}, ${gradientColors})`,
        backgroundSize: direction === 'horizontal' ? '300% 100%' : direction === 'vertical' ? '100% 300%' : '300% 300%',
        backgroundRepeat: 'repeat'
    };

    return (
        <motion.div
            ref={containerRef}
            className={`animated-gradient-text ${showBorder ? 'with-border' : ''} ${className}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {showBorder && <motion.div className="gradient-overlay" style={{ ...gradientStyle, backgroundPosition }} />}
            <motion.div className="text-content" style={{ ...gradientStyle, backgroundPosition }}>
                {children}
            </motion.div>
        </motion.div>
    );
}
