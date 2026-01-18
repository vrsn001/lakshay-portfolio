import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const LogoLoop = ({
    logos = [],
    speed = 50,
    direction = 'left',
    gap = 24,
    hoverSpeed = 10,
    scaleOnHover = false,
    fadeOut = false,
    fadeOutColor = '#ffffff',
    ariaLabel = 'Logo carousel'
}) => {
    const containerRef = useRef(null);
    const animationRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const scrollContent = container.querySelector('.logo-loop-scroll');
        if (!scrollContent) return;

        let scrollPosition = 0;
        const isLeft = direction === 'left';
        let currentSpeed = speed;

        const animate = () => {
            scrollPosition += (isLeft ? -1 : 1) * (currentSpeed / 60);
            const maxScroll = scrollContent.scrollWidth / 2;

            if (Math.abs(scrollPosition) >= maxScroll) {
                scrollPosition = 0;
            }

            scrollContent.style.transform = `translateX(${scrollPosition}px)`;
            animationRef.current = requestAnimationFrame(animate);
        };

        const handleMouseEnter = () => {
            currentSpeed = hoverSpeed;
        };

        const handleMouseLeave = () => {
            currentSpeed = speed;
        };

        container.addEventListener('mouseenter', handleMouseEnter);
        container.addEventListener('mouseleave', handleMouseLeave);
        animationRef.current = requestAnimationFrame(animate);

        return () => {
            container.removeEventListener('mouseenter', handleMouseEnter);
            container.removeEventListener('mouseleave', handleMouseLeave);
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [speed, direction, hoverSpeed]);

    // Duplicate logos for seamless loop
    const duplicatedLogos = [...logos, ...logos];

    return (
        <div
            ref={containerRef}
            className="logo-loop-container"
            role="region"
            aria-label={ariaLabel}
            style={{
                position: 'relative',
                overflow: 'hidden',
                width: '100%'
            }}
        >
            {fadeOut && (
                <>
                    <div
                        className="logo-loop-fade-left"
                        style={{
                            position: 'absolute',
                            left: 0,
                            top: 0,
                            bottom: 0,
                            width: '100px',
                            background: `linear-gradient(to right, ${fadeOutColor}, transparent)`,
                            zIndex: 2,
                            pointerEvents: 'none'
                        }}
                    />
                    <div
                        className="logo-loop-fade-right"
                        style={{
                            position: 'absolute',
                            right: 0,
                            top: 0,
                            bottom: 0,
                            width: '100px',
                            background: `linear-gradient(to left, ${fadeOutColor}, transparent)`,
                            zIndex: 2,
                            pointerEvents: 'none'
                        }}
                    />
                </>
            )}
            <div
                className="logo-loop-scroll"
                style={{
                    display: 'flex',
                    gap: `${gap}px`,
                    willChange: 'transform'
                }}
            >
                {duplicatedLogos.map((logo, index) => (
                    <div
                        key={index}
                        className={`logo-loop-item ${scaleOnHover ? 'scale-on-hover' : ''}`}
                        style={{
                            flexShrink: 0,
                            transition: scaleOnHover ? 'transform 0.3s ease' : 'none'
                        }}
                    >
                        {logo.node}
                    </div>
                ))}
            </div>
        </div>
    );
};

LogoLoop.propTypes = {
    logos: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string,
            node: PropTypes.node.isRequired
        })
    ).isRequired,
    speed: PropTypes.number,
    direction: PropTypes.oneOf(['left', 'right']),
    gap: PropTypes.number,
    hoverSpeed: PropTypes.number,
    scaleOnHover: PropTypes.bool,
    fadeOut: PropTypes.bool,
    fadeOutColor: PropTypes.string,
    ariaLabel: PropTypes.string
};

export default LogoLoop;
