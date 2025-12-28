import { OrbitControls } from '@react-three/drei'
import React from 'react'

export const PCTScene = () => {
    return (
        <>
            <OrbitControls />
            <ambientLight />
            <mesh>
                <boxGeometry />
                <meshStandardMaterial />
            </mesh>
        </>
    )
}

export default PCTScene
