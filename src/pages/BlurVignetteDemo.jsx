import React from 'react';
import {
    BlurVignette,
    BlurVignetteArticle,
} from '../components/ui/BlurVignette';

function BlurVignetteDemo() {
    return (
        <div style={{ padding: '40px', background: '#1a1a1a', minHeight: '100vh' }}>
            <h1 style={{ color: 'white', marginBottom: '32px', fontFamily: 'Caveat, cursive', fontSize: '48px' }}>
                Blur Vignette Demo
            </h1>

            <BlurVignette
                radius="24px"
                inset="10px"
                transitionLength="100px"
                blur="15px"
                classname="h-96 w-full overflow-hidden"
                style={{ height: '400px', width: '100%' }}
            >
                <video
                    autoPlay={true}
                    muted
                    loop
                    playsInline
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.3s ease',
                    }}
                    onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
                    onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                >
                    <source
                        src="https://cdn.pixabay.com/video/2023/10/19/185726-876210695_large.mp4"
                        type="video/mp4"
                    />
                </video>
                <BlurVignetteArticle>
                    <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' }}>
                        Beautiful Video with Blur Vignette
                    </h2>
                    <p style={{ opacity: 0.8 }}>
                        Hover over the video to see the zoom effect
                    </p>
                </BlurVignetteArticle>
            </BlurVignette>
        </div>
    );
}

export default BlurVignetteDemo;
