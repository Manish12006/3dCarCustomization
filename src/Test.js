import { OrbitControls, useAnimations } from "@react-three/drei";
import { useFrame, useLoader } from "@react-three/fiber";
import { Suspense, useEffect, useRef } from "react";
import { TextureLoader } from "three";
import Particlestest from "./Particlestest";
import { useGLTF } from "@react-three/drei";
import TestLeva from "./TestLeva";




const Test = () => {
    const cuberef = useRef();
    const texture = useLoader(TextureLoader, "./img/1.jpg")
    const model = useGLTF("./model/model5.glb");
    const animations = useAnimations(model.animations, model.scene);
    console.log(animations)


    // useFrame((state, delta) => {
    //     cuberef.current.rotation.x += delta * 2;
    // })

    useEffect(() => {
        animations.actions.Scene.play();

    }, [])
    return (
        <>
            <OrbitControls />
            <axesHelper args={[10]} />


            <gridHelper args={[20, 20, "red"]} />
            {/* <mesh position={[0, 0.5, 0]} ref={cuberef}>
                <boxGeometry />
                <meshBasicMaterial map={texture} />
            </mesh> */}

            {/* <Particlestest/> */}
            <ambientLight intensity={20} />
            {/* <Suspense fallback={
                <mesh>
                    <boxGeometry/>
                    <meshBasicMaterial/>
                </mesh>
            } >
                <primitive object={model.scene} scale={0.2}  ></primitive>
            </Suspense> */}

            <TestLeva/>


        </>

    );
}

export default Test