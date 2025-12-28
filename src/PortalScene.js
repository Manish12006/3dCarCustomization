import {
    MeshPortalMaterial,
    OrbitControls,
    RoundedBox,
    useGLTF,
    useTexture,
    Text,
    CameraControls
} from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

const PortalScene = () => {
    const model = useGLTF('./model/1.glb')
    const fruitsmodel = useGLTF('./model/fruits.glb')
    const vegetablemodel = useGLTF('./model/vegetables.glb')

    const texture = useTexture('./texture/1.png')
    const fruitstexture = useTexture('./texture/fruitstexture.jpg')
    const vegetabletexture = useTexture('./texture/vegetabletexture.jpg')
    const eggtexture = useTexture('./texture/eggtexture.jpg')

    const boxref = useRef()
    const fruitref = useRef()
    const vegetableref = useRef()
    const cameraref = useRef()
    const orbitref = useRef();

    const [blender, setblender] = useState(false)
    const [Fblender, setFblender] = useState(false)
    const [Vblender, setVblender] = useState(false)

    const { lerp } = THREE.MathUtils

    // 📦 Egg Portal
    useFrame(() => {
        if (boxref.current?.material) {
            boxref.current.material.blend = lerp(
                boxref.current.material.blend,
                blender ? 1 : 0,
                0.05
            )
        }

        if (fruitref.current?.material) {
            fruitref.current.material.blend = lerp(
                fruitref.current.material.blend,
                Fblender ? 1 : 0,
                0.05
            )
        }

        if (vegetableref.current?.material) {
            vegetableref.current.material.blend = lerp(
                vegetableref.current.material.blend,
                Vblender ? 1 : 0,
                0.05
            )
        }
    })

    useEffect(() => {
        if (blender) {
            cameraref.current.setLookAt(0, 0, 6, 0, 0, 0, true)
        } else if (!Fblender && !Vblender) {
            cameraref.current.setLookAt(0, 0, 10, 0, 0, 0, true)
        }
    }, [blender])

    useEffect(() => {
        if (Fblender) {
            // Fruits portal is at x: 5, z: 1 — model inside is offset to x: -0.4, y: -1
            cameraref.current.setLookAt(5, 0, 6, 4.6, -1, 1, true)
            orbitref.current.target.copy(fruitref.current.getWorldPosition(new THREE.Vector3())); orbitref.current.update();

        } else {
            cameraref.current.setLookAt(0, 0, 10, 0, 0, 0, true)
            orbitref.current.target.copy(boxref.current.getWorldPosition(new THREE.Vector3())); orbitref.current.update();

        }
    }, [Fblender])

    useEffect(() => {
        if (Vblender) {
            // Vegetables portal is at x: -5, z: 1 — model inside offset to x: 0.3, y: -0.9
            cameraref.current.setLookAt(-5, 0, 6, -4.7, -0.9, 1, true)
            orbitref.current.target.copy(vegetableref.current.getWorldPosition(new THREE.Vector3())); orbitref.current.update();

        } else {
            cameraref.current.setLookAt(0, 0, 10, 0, 0, 0, true)
            orbitref.current.target.copy(boxref.current.getWorldPosition(new THREE.Vector3())); orbitref.current.update();

        }
    }, [Vblender])

    return (
        <>
            <CameraControls ref={cameraref} />
            <OrbitControls ref={orbitref} />

            {/* 🥚 Eggs */}
            <RoundedBox
                args={[4, 6, 0.1]}
                radius={0.2}
                ref={boxref}
                onDoubleClick={() => {
                    setblender(!blender)
                    setFblender(false)
                    setVblender(false)
                }}
            >
                <Text font="./fonts/bold.ttf" color="white" fontSize={0.6} position={[-1.15, 2.5, 0.1]}>
                    Eggs
                </Text>
                <MeshPortalMaterial>
                    <primitive object={model.scene} position-y={1} scale={0.8} />
                    <mesh>
                        <sphereGeometry args={[5, 64, 64]} />
                        <meshBasicMaterial map={eggtexture} side={THREE.BackSide} opacity={0.2} />
                    </mesh>
                </MeshPortalMaterial>
            </RoundedBox>

            {/* 🍎 Fruits */}
            <RoundedBox
                args={[4, 6, 0.1]}
                position-x={5}
                position-z={1}
                rotation-y={-0.3}
                radius={0.2}
                ref={fruitref}
                onDoubleClick={() => {
                    setFblender(!Fblender)
                    setblender(false)
                    setVblender(false)
                }}
            >
                <Text font="./fonts/bold.ttf" color="white" fontSize={0.6} position={[-1.15, 2.5, 0.1]}>
                    Fruits
                </Text>
                <MeshPortalMaterial blend={0}>
                    <ambientLight intensity={1} />
                    <directionalLight position={[2, 2, 2]} intensity={1} />
                    <primitive object={fruitsmodel.scene} scale={0.8} position-x={-0.4} position-y={-1} />
                    <mesh>
                        <sphereGeometry args={[5, 64, 64]} />
                        <meshBasicMaterial map={fruitstexture} side={THREE.BackSide} opacity={0.2} />
                    </mesh>
                </MeshPortalMaterial>
            </RoundedBox>

            {/* 🥦 Vegetables */}
            <RoundedBox
                args={[4, 6, 0.1]}
                position-x={-5}
                position-z={1}
                rotation-y={0.3}
                radius={0.2}
                ref={vegetableref}
                onDoubleClick={() => {
                    setVblender(!Vblender)
                    setFblender(false)
                    setblender(false)
                }}
            >
                <Text font="./fonts/bold.ttf" color="white" fontSize={0.6} position={[-0.35, 2.5, 0.1]}>
                    Vegetables
                </Text>
                <MeshPortalMaterial>
                    <primitive
                        object={vegetablemodel.scene}
                        scale={0.1}
                        rotation-y={Math.PI / 2}
                        position-x={0.3}
                        position-y={-0.9}
                    />
                    <mesh>
                        <sphereGeometry args={[5, 64, 64]} />
                        <meshBasicMaterial map={vegetabletexture} side={THREE.BackSide} opacity={0.2} />
                    </mesh>
                </MeshPortalMaterial>
            </RoundedBox>
        </>
    )
}

export default PortalScene
