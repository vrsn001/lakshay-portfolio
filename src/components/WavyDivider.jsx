

export default function WavyDivider({ color = "#c73e3a", height = "12px", className = "" }) {
    return (
        <div className={`wavy-divider ${className}`} style={{ height: height, width: '100%', overflow: 'hidden', margin: '20px 0' }}>
            <svg
                viewBox="0 0 1200 12"
                preserveAspectRatio="none"
                style={{ width: '100%', height: '100%', display: 'block' }}
            >
                <path
                    d="M0,6 C30,12 30,0 60,6 C90,12 90,0 120,6 C150,12 150,0 180,6 C210,12 210,0 240,6 C270,12 270,0 300,6 C330,12 330,0 360,6 C390,12 390,0 420,6 C450,12 450,0 480,6 C510,12 510,0 540,6 C570,12 570,0 600,6 C630,12 630,0 660,6 C690,12 690,0 720,6 C750,12 750,0 780,6 C810,12 810,0 840,6 C870,12 870,0 900,6 C930,12 930,0 960,6 C990,12 990,0 1020,6 C1050,12 1050,0 1080,6 C1110,12 1110,0 1140,6 C1170,12 1170,0 1200,6"
                    fill="none"
                    stroke={color}
                    strokeWidth="2"
                    vectorEffect="non-scaling-stroke"
                />
                {/* Second line for double-stamp effect */}
                <path
                    d="M0,2 C30,8 30,-4 60,2 C90,8 90,-4 120,2 C150,8 150,-4 180,2 C210,8 210,-4 240,2 C270,8 270,-4 300,2 C330,8 330,-4 360,2 C390,8 390,-4 420,2 C450,8 450,-4 480,2 C510,8 510,-4 540,2 C570,8 570,-4 600,2 C630,8 630,-4 660,2 C690,8 690,-4 720,2 C750,8 750,-4 780,2 C810,8 810,-4 840,2 C870,8 870,-4 900,2 C930,8 930,-4 960,2 C990,8 990,-4 1020,2 C1050,8 1050,-4 1080,2 C1110,8 1110,-4 1140,2 C1170,8 1170,-4 1200,2"
                    fill="none"
                    stroke={color}
                    strokeWidth="1"
                    opacity="0.6"
                    vectorEffect="non-scaling-stroke"
                />
            </svg>
        </div>
    );
}
