import { MeshReflectorMaterial, OrbitControls, Environment, MeshWobbleMaterial, MeshDistortMaterial, useCursor } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import React, { useRef, useState } from 'react'
import * as THREE from "three"
import { plane } from 'three/examples/jsm/Addons.js';



const ShadersScene = () => {
    const [hover, sethover] = useState(false);
    useCursor(hover);
    const planeref = useRef();

    const {lerp} = THREE.MathUtils;

    useFrame(() => {
        if (hover) {
            planeref.current.material.distort = lerp(planeref.current.material.distort,0.4,0.05);
        }
        else {
            planeref.current.material.distort = lerp(planeref.current.material.distort,0,0.02);
        }


    });

    return (


        <>
            {/* <Environment files="./hdri/1.hdr" background/> */}
            <ambientLight intensity={5} />
            <OrbitControls />
            {/* MESH REFLECTION MATERIAL */}
            {/* <mesh position={[0,1,0]} >
                <boxGeometry />
                <meshStandardMaterial color="red"/>
            </mesh>
            <mesh rotation-x={-Math.PI / 2}>
                <planeGeometry args={[10, 15]} />
                <MeshReflectorMaterial resolution={1024} color="gray" blur={[1000,1000]} mixBlur={1} mirror={1}/>
            </mesh> */}

            {/* MESH WOBBLE MATERIAL */}
            {/* <mesh>
                <boxGeometry args={[1,1,1,32,32,32]} />
                <MeshWobbleMaterial factor={2} speed={2}  />
            </mesh> */}

            {/* MESH DISTORT MATERIAL */}
            <mesh onPointerOver={() => sethover(true)} onPointerLeave={() => sethover(false)} ref={planeref}>
                <planeGeometry args={[5, 5, 32, 32]} />
                <MeshDistortMaterial distort={0} speed={1} />
            </mesh>
        </>
    );
}

export default ShadersScene