import { useEffect, useState, useRef } from 'react';

// Check touch device immediately on module load
const isTouchDevice = () => {
    if (typeof window === 'undefined') return true;
    return window.matchMedia("(pointer: coarse)").matches ||
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0;
};

// Cursor icons for different sections
const CURSOR_ICONS = {
    default: {
        viewBox: "0 0 24 24",
        path: <><path d="M12 2L2 22L12 18L22 22L12 2Z" fill="#F5F0E1" stroke="#F5F0E1" strokeWidth="1" /><path d="M12 2V18" stroke="#000" strokeWidth="1" /></>
    },
    experience: {
        viewBox: "0 0 24 24",
        path: <><path d="M3 6C3 4.89543 3.89543 4 5 4H9L11 6H19C20.1046 6 21 6.89543 21 8V18C21 19.1046 20.1046 20 19 20H5C3.89543 20 3 19.1046 3 18V6Z" fill="#F5F0E1" stroke="#F5F0E1" strokeWidth="1" /><path d="M3 8H21" stroke="#000" strokeWidth="1" /></>
    },
    contact: {
        viewBox: "0 0 24 24",
        path: <><path d="M3 7C3 5.89543 3.89543 5 5 5H19C20.1046 5 21 5.89543 21 7V17C21 18.1046 20.1046 19 19 19H5C3.89543 19 3 18.1046 3 17V7Z" fill="#F5F0E1" stroke="#F5F0E1" strokeWidth="1" /><path d="M3 7L12 13L21 7" stroke="#000" strokeWidth="1" /></>
    },
    skills: {
        viewBox: "0 0 24 24",
        path: <><path d="M4 4H12L20 12L12 20L4 12V4Z" fill="#F5F0E1" stroke="#F5F0E1" strokeWidth="1" /><circle cx="8" cy="8" r="1.5" fill="#000" /></>
    },
    education: {
        viewBox: "0 0 24 24",
        path: <><path d="M12 3L2 8L12 13L22 8L12 3Z" fill="#F5F0E1" stroke="#F5F0E1" strokeWidth="1" /><path d="M6 10V16L12 19L18 16V10" stroke="#F5F0E1" strokeWidth="1.5" fill="none" /><path d="M20 8V14" stroke="#F5F0E1" strokeWidth="1.5" /></>
    }
};

export default function CustomCursor() {
    // Early bail - check on first render
    const [isTouch] = useState(isTouchDevice);

    const cursorRef = useRef(null);
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [currentSection, setCurrentSection] = useState('default');
    const mousePosition = useRef({ x: 0, y: 0 });
    const cursorPosition = useRef({ x: -100, y: -100 });

    // Section detection via IntersectionObserver
    useEffect(() => {
        if (isTouch) return;

        const sections = ['experience', 'contact', 'skills', 'education'];
        const sectionElements = sections.map((id) => document.getElementById(id)).filter(Boolean);
        if (sectionElements.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
                        setCurrentSection(entry.target.id);
                    }
                });
            },
            { threshold: [0.3, 0.5, 0.7], rootMargin: '-100px 0px -100px 0px' }
        );

        sectionElements.forEach((el) => observer.observe(el));

        const handleScroll = () => {
            if (window.scrollY < 300) setCurrentSection('default');
        };
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            observer.disconnect();
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isTouch]);

    useEffect(() => {
        if (isTouch) return;

        const cursor = cursorRef.current;
        if (!cursor) return;

        let animationFrameId;

        const onMouseMove = (e) => {
            mousePosition.current = { x: e.clientX, y: e.clientY };
            if (!isVisible) setIsVisible(true);
        };

        const onMouseLeave = () => setIsVisible(false);
        const onMouseEnter = () => setIsVisible(true);

        const handleMouseOver = (e) => {
            const isInteractive =
                e.target.tagName === 'A' ||
                e.target.tagName === 'BUTTON' ||
                e.target.tagName === 'INPUT' ||
                e.target.closest('a') ||
                e.target.closest('button') ||
                e.target.classList.contains('interactive');
            setIsHovering(isInteractive);
        };

        const loop = () => {
            const ease = 0.28;
            cursorPosition.current.x += (mousePosition.current.x - cursorPosition.current.x) * ease;
            cursorPosition.current.y += (mousePosition.current.y - cursorPosition.current.y) * ease;
            cursor.style.transform = `translate3d(${cursorPosition.current.x}px, ${cursorPosition.current.y}px, 0)`;
            animationFrameId = requestAnimationFrame(loop);
        };

        window.addEventListener('mousemove', onMouseMove, { passive: true });
        document.addEventListener('mouseleave', onMouseLeave);
        document.addEventListener('mouseenter', onMouseEnter);
        document.addEventListener('mouseover', handleMouseOver, { passive: true });
        loop();

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseleave', onMouseLeave);
            document.removeEventListener('mouseenter', onMouseEnter);
            document.removeEventListener('mouseover', handleMouseOver);
            cancelAnimationFrame(animationFrameId);
        };
    }, [isVisible, isTouch]);

    // Return null immediately on touch - no DOM, no styles, nothing
    if (isTouch) return null;

    const cursorIcon = CURSOR_ICONS[currentSection] || CURSOR_ICONS.default;

    return (
        <>
            <style>{`
                body, a, button, input, textarea, select { cursor: none; }
                @media (hover: none) and (pointer: coarse) {
                    body, a, button, input, textarea, select { cursor: auto; }
                }
            `}</style>
            <div
                ref={cursorRef}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    pointerEvents: 'none',
                    zIndex: 9999,
                    mixBlendMode: 'difference',
                    opacity: isVisible ? 1 : 0,
                    transition: 'opacity 0.3s ease',
                    willChange: 'transform'
                }}
            >
                <div style={{
                    width: '20px',
                    height: '20px',
                    transition: 'transform 0.2s ease',
                    transform: isHovering ? 'scale(1.5) rotate(-45deg)' : 'scale(1) rotate(0deg)',
                }}>
                    <svg viewBox={cursorIcon.viewBox} fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
                        {cursorIcon.path}
                    </svg>
                </div>
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
            <style>{`@keyframes spin { from { transform: translate(-50%, -50%) rotate(0deg); } to { transform: translate(-50%, -50%) rotate(360deg); } }`}</style>
        </>
    );
}
