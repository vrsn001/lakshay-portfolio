import { useEffect, useState, useRef } from 'react';

export default function CustomCursor() {
    // Use refs for direct DOM manipulation to avoid re-renders on every mouse move
    const cursorRef = useRef(null);
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check if device is likely touch-based or small screen
        const isTouchDevice = () => {
            return (('ontouchstart' in window) ||
                (navigator.maxTouchPoints > 0) ||
                (navigator.msMaxTouchPoints > 0));
        };

        // Don't initialize custom cursor on touch devices
        if (isTouchDevice() || window.matchMedia("(max-width: 768px)").matches) {
            return;
        }

        setIsVisible(true);
        const cursor = cursorRef.current;
        let animationFrameId;

        const updatePosition = (e) => {
            // Direct DOM update - bypassing React render cycle for performance
            if (cursor) {
                // Use transform3d for hardware acceleration
                cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
            }
        };

        const handleMouseOver = (e) => {
            // Check if the target is a link, button, or interactive element
            if (
                e.target.tagName === 'A' ||
                e.target.tagName === 'BUTTON' ||
                e.target.closest('a') ||
                e.target.closest('button') ||
                e.target.classList.contains('interactive')
            ) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener('mousemove', updatePosition);
        document.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', updatePosition);
            document.removeEventListener('mouseover', handleMouseOver);
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }
        };
    }, []);

    if (!isVisible) return null;

    return (
        <>
            <style>{`
        @media (min-width: 769px) {
            body { cursor: none; }
            a, button, input, textarea, select { cursor: none; }
        }
      `}</style>
            <div
                ref={cursorRef}
                className="custom-cursor"
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    pointerEvents: 'none',
                    zIndex: 9999,
                    mixBlendMode: 'difference',
                    willChange: 'transform' // Hint to browser for optimization
                }}
            >
                {/* Base Cursor - Pen Nib */}
                <div style={{
                    width: '20px',
                    height: '20px',
                    transition: 'transform 0.2s ease, opacity 0.2s ease', // Only animate transform/opacity
                    transform: isHovering ? 'scale(1.5) rotate(-45deg)' : 'scale(1) rotate(0deg)',
                    opacity: 1,
                }}>
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
                        <path d="M12 2L2 22L12 18L22 22L12 2Z" fill="#F5F0E1" stroke="#F5F0E1" strokeWidth="1" />
                        <path d="M12 2V18" stroke="#000" strokeWidth="1" />
                    </svg>
                </div>

                {/* Hover Highlight Ring */}
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: isHovering ? '40px' : '0px',
                    height: isHovering ? '40px' : '0px',
                    borderRadius: '50%',
                    border: '1px dashed #F5F0E1',
                    opacity: 0.5,
                    transition: 'all 0.3s ease',
                    animation: isHovering ? 'spin 4s linear infinite' : 'none'
                }} />
            </div>
            <style>{`
        @keyframes spin { from { transform: translate(-50%, -50%) rotate(0deg); } to { transform: translate(-50%, -50%) rotate(360deg); } }
      `}</style>
        </>
    );
}
