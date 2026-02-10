import { useEffect, useRef, useState, useCallback } from 'react';

// Check touch device immediately on module load
const isTouchDevice = () => {
    if (typeof window === 'undefined') return true;
    return window.matchMedia("(pointer: coarse)").matches ||
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0;
};

export default function InkSplatter() {
    // Early bail - check on first render
    const [isTouch] = useState(isTouchDevice);
    const containerRef = useRef(null);

    const createSplatter = useCallback((x, y) => {
        if (!containerRef.current) return;

        const numDots = 4 + Math.floor(Math.random() * 3);

        for (let i = 0; i < numDots; i++) {
            const dot = document.createElement('div');

            const size = 4 + Math.random() * 6;
            const angle = (Math.PI * 2 * i) / numDots + (Math.random() - 0.5) * 0.5;
            const distance = 20 + Math.random() * 30;
            const duration = 400 + Math.random() * 300;
            const opacity = 0.5 + Math.random() * 0.4;
            const endX = Math.cos(angle) * distance;
            const endY = Math.sin(angle) * distance;

            Object.assign(dot.style, {
                position: 'fixed',
                left: `${x}px`,
                top: `${y}px`,
                width: `${size}px`,
                height: `${size}px`,
                backgroundColor: document.documentElement.getAttribute('data-theme') === 'dark' ? '#f5f0e1' : '#1a1a1a',
                borderRadius: '50%',
                pointerEvents: 'none',
                zIndex: '9998',
                opacity: opacity.toString(),
                transform: 'translate(-50%, -50%)',
                willChange: 'transform, opacity'
            });

            containerRef.current.appendChild(dot);

            const startTime = performance.now();
            const animate = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const easeOut = 1 - Math.pow(1 - progress, 3);

                dot.style.transform = `translate(calc(-50% + ${endX * easeOut}px), calc(-50% + ${endY * easeOut}px)) scale(${1 - 0.7 * progress})`;
                dot.style.opacity = (opacity * (1 - progress)).toString();

                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    dot.remove();
                }
            };

            requestAnimationFrame(animate);
        }
    }, []);

    useEffect(() => {
        // Don't set up anything on touch devices
        if (isTouch) return;

        const handleClick = (e) => {
            createSplatter(e.clientX, e.clientY);
        };

        window.addEventListener('click', handleClick, { passive: true });
        return () => window.removeEventListener('click', handleClick);
    }, [isTouch, createSplatter]);

    // Return null immediately on touch - no DOM element created
    if (isTouch) return null;

    return <div ref={containerRef} aria-hidden="true" />;
}
