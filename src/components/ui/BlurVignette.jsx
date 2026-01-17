import React from 'react';
import { cn } from '../../lib/utils';

/**
 * BlurVignette Component
 * Creates a blur/vignette effect around the edges of its children content
 * 
 * @param {Object} props
 * @param {string} props.radius - Border radius for the container
 * @param {string} props.inset - How far from the edge the blur starts
 * @param {string} props.transitionLength - Width of the blur transition area
 * @param {string} props.blur - Amount of blur to apply
 * @param {string} props.classname - Additional CSS classes
 * @param {React.ReactNode} props.children - Content to display inside
 */
export function BlurVignette({
    radius = '24px',
    inset = '10px',
    transitionLength = '100px',
    blur = '15px',
    classname,
    children
}) {
    const maskGradient = `linear-gradient(to bottom, 
    black ${inset}, 
    transparent calc(${inset} + ${transitionLength})
  )`;

    return (
        <div
            className={cn('blur-vignette-container', classname)}
            style={{
                position: 'relative',
                borderRadius: radius,
                overflow: 'hidden',
            }}
        >
            {children}

            {/* Top blur edge */}
            <div
                className="blur-vignette-edge blur-vignette-top"
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: `calc(${inset} + ${transitionLength})`,
                    backdropFilter: `blur(${blur})`,
                    WebkitBackdropFilter: `blur(${blur})`,
                    maskImage: maskGradient,
                    WebkitMaskImage: maskGradient,
                    pointerEvents: 'none',
                    zIndex: 10,
                }}
            />

            {/* Bottom blur edge */}
            <div
                className="blur-vignette-edge blur-vignette-bottom"
                style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: `calc(${inset} + ${transitionLength})`,
                    backdropFilter: `blur(${blur})`,
                    WebkitBackdropFilter: `blur(${blur})`,
                    maskImage: `linear-gradient(to top, black ${inset}, transparent calc(${inset} + ${transitionLength}))`,
                    WebkitMaskImage: `linear-gradient(to top, black ${inset}, transparent calc(${inset} + ${transitionLength}))`,
                    pointerEvents: 'none',
                    zIndex: 10,
                }}
            />

            {/* Left blur edge */}
            <div
                className="blur-vignette-edge blur-vignette-left"
                style={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: 0,
                    width: `calc(${inset} + ${transitionLength})`,
                    backdropFilter: `blur(${blur})`,
                    WebkitBackdropFilter: `blur(${blur})`,
                    maskImage: `linear-gradient(to right, black ${inset}, transparent calc(${inset} + ${transitionLength}))`,
                    WebkitMaskImage: `linear-gradient(to right, black ${inset}, transparent calc(${inset} + ${transitionLength}))`,
                    pointerEvents: 'none',
                    zIndex: 10,
                }}
            />

            {/* Right blur edge */}
            <div
                className="blur-vignette-edge blur-vignette-right"
                style={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    right: 0,
                    width: `calc(${inset} + ${transitionLength})`,
                    backdropFilter: `blur(${blur})`,
                    WebkitBackdropFilter: `blur(${blur})`,
                    maskImage: `linear-gradient(to left, black ${inset}, transparent calc(${inset} + ${transitionLength}))`,
                    WebkitMaskImage: `linear-gradient(to left, black ${inset}, transparent calc(${inset} + ${transitionLength}))`,
                    pointerEvents: 'none',
                    zIndex: 10,
                }}
            />
        </div>
    );
}

/**
 * BlurVignetteArticle Component
 * Optional overlay content for the BlurVignette
 * Can be used to display text or other content over the vignette
 */
export function BlurVignetteArticle({ children, className }) {
    return (
        <article
            className={cn('blur-vignette-article', className)}
            style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '24px',
                zIndex: 20,
                color: 'white',
                background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)',
            }}
        >
            {children}
        </article>
    );
}

export default BlurVignette;
