import { OrbitControls, RoundedBox } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import React, { useRef } from 'react'
import { AmbientLight } from 'three'
import * as THREE from "three"


export const CubeLooking = () => {
    const { mouse,camera } = useThree();
    const cuberef = useRef();
    useFrame(()=>{
        const vec = new THREE.Vector3(mouse.x*100,mouse.y*100,0.5);
        vec.unproject(camera);
        cuberef.current.lookAt(vec)
    })

    return (
        <>
            <OrbitControls />
            <ambientLight />
            <mesh scale={3} ref={cuberef}>
                <boxGeometry />
                <meshStandardMaterial />
            </mesh>
        </>
    )
}

export default CubeLooking
