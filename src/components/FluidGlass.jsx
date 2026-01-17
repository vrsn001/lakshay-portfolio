/* eslint-disable react/no-unknown-property */
import * as THREE from 'three';
import { useRef, useState, useEffect, memo } from 'react';
import { Canvas, createPortal, useFrame, useThree } from '@react-three/fiber';
import {
    useFBO,
    MeshTransmissionMaterial,
} from '@react-three/drei';
import { easing } from 'maath';

export default function FluidGlass({
    children,
    lensProps = {},
    backgroundContent = null
}) {
    const {
        scale = 0.25,
        ior = 1.15,
        thickness = 5,
        chromaticAberration = 0.1,
        anisotropy = 0.01,
        color = '#ffffff',
        ...extraMat
    } = lensProps;

    return (
        <Canvas
            camera={{ position: [0, 0, 20], fov: 15 }}
            gl={{ alpha: true }}
            style={{ background: 'transparent' }}
        >
            <LensEffect
                scale={scale}
                ior={ior}
                thickness={thickness}
                chromaticAberration={chromaticAberration}
                anisotropy={anisotropy}
                color={color}
                extraMat={extraMat}
            >
                {backgroundContent}
            </LensEffect>
        </Canvas>
    );
}

const LensEffect = memo(function LensEffect({
    children,
    scale,
    ior,
    thickness,
    chromaticAberration,
    anisotropy,
    color,
    extraMat
}) {
    const lensRef = useRef();
    const buffer = useFBO();
    const { viewport: vp } = useThree();
    const [scene] = useState(() => new THREE.Scene());

    // Create lens geometry (cylinder)
    const lensGeometry = new THREE.CylinderGeometry(1, 1, 0.3, 64);

    useFrame((state, delta) => {
        const { gl, viewport, pointer, camera } = state;
        const v = viewport.getCurrentViewport(camera, [0, 0, 15]);

        // Follow pointer
        const destX = (pointer.x * v.width) / 2;
        const destY = (pointer.y * v.height) / 2;
        easing.damp3(lensRef.current.position, [destX, destY, 15], 0.1, delta);

        // Render scene to buffer
        gl.setRenderTarget(buffer);
        gl.render(scene, camera);
        gl.setRenderTarget(null);
    });

    return (
        <>
            {createPortal(children, scene)}
            {/* Background plane */}
            <mesh scale={[vp.width, vp.height, 1]}>
                <planeGeometry />
                <meshBasicMaterial map={buffer.texture} transparent />
            </mesh>
            {/* Lens */}
            <mesh
                ref={lensRef}
                scale={scale}
                rotation-x={Math.PI / 2}
                geometry={lensGeometry}
            >
                <MeshTransmissionMaterial
                    buffer={buffer.texture}
                    ior={ior}
                    thickness={thickness}
                    anisotropy={anisotropy}
                    chromaticAberration={chromaticAberration}
                    color={color}
                    {...extraMat}
                />
            </mesh>
        </>
    );
});
