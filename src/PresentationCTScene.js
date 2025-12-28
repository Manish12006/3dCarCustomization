import { PresentationControls } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import React, { useEffect, useRef } from 'react'

const PresentationCTScene = () => {
    const { camera } = useThree();
    const hasSetCamera = useRef(false); // Prevent re-setting on every render

    useEffect(() => {
        if (!hasSetCamera.current) {
            camera.position.set(0, 0, 5);   // Set initial camera position
            camera.lookAt(0, 0, 0);         // Look at the cube
            hasSetCamera.current = true;
        }
    }, [camera]);

    return (
        <>
            <ambientLight intensity={0.5} />
            <directionalLight position={[2, 2, 2]} />

            <PresentationControls
                global
                rotation={[0, 0, 0]}
                polar={[0, Math.PI / 2]}
                azimuth={[-Math.PI / 2, Math.PI / 2]}
                config={{ mass: 1, tension: 170 }}
                snap
            >
                <mesh position={[0, 0, 0]}>
                    <boxGeometry />
                    <meshStandardMaterial color="skyblue" />
                </mesh>
            </PresentationControls>
        </>
    );
};

export default PresentationCTScene;
