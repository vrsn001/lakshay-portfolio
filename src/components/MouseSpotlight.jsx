import { useEffect, useRef, useState } from 'react';

// Check touch device immediately on module load
const isTouchDevice = () => {
    if (typeof window === 'undefined') return true;
    return window.matchMedia("(pointer: coarse)").matches ||
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0;
};

export default function MouseSpotlight() {
    const [isTouch] = useState(isTouchDevice);

    const spotlightRef = useRef(null);
    const mousePosition = useRef({ x: 0, y: 0 });
    const spotlightPosition = useRef({ x: 0, y: 0 });

    useEffect(() => {
        if (isTouch) return;

        const spotlight = spotlightRef.current;
        if (!spotlight) return;

        let animationFrameId;

        const onMouseMove = (e) => {
            mousePosition.current = { x: e.clientX, y: e.clientY };
        };

        // Update gradient color based on theme
        const updateGradient = () => {
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
            const opacity1 = isDark ? 0.18 : 0.25;
            const opacity2 = isDark ? 0.08 : 0.12;
            spotlight.style.background = `radial-gradient(300px circle at center, rgba(196, 154, 60, ${opacity1}), rgba(196, 154, 60, ${opacity2}) 40%, transparent 70%)`;
        };

        updateGradient();

        // Watch for theme changes
        const themeObserver = new MutationObserver(updateGradient);
        themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

        const loop = () => {
            const ease = 0.15;

            const dx = mousePosition.current.x - spotlightPosition.current.x;
            const dy = mousePosition.current.y - spotlightPosition.current.y;

            spotlightPosition.current.x += dx * ease;
            spotlightPosition.current.y += dy * ease;

            spotlight.style.transform = `translate3d(${spotlightPosition.current.x - 300}px, ${spotlightPosition.current.y - 300}px, 0)`;

            animationFrameId = requestAnimationFrame(loop);
        };

        window.addEventListener('mousemove', onMouseMove, { passive: true });
        loop();

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            cancelAnimationFrame(animationFrameId);
            themeObserver.disconnect();
        };
    }, [isTouch]);

    if (isTouch) return null;

    return (
        <div
            ref={spotlightRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '600px',
                height: '600px',
                pointerEvents: 'none',
                zIndex: 2,
                willChange: 'transform',
                background: 'radial-gradient(300px circle at center, rgba(196, 154, 60, 0.25), rgba(196, 154, 60, 0.12) 40%, transparent 70%)',
                borderRadius: '50%',
            }}
            aria-hidden="true"
        />
    );
}
