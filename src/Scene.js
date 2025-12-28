import { useFrame, extend, useThree } from "@react-three/fiber"
import { useRef } from "react"
import { BoxGeometry, DoubleSide } from "three";

import Custommesh from "./custommesh";
import { useLoader } from "@react-three/fiber";
import * as THREE from "three"
import Particles from "./Particles";
import Model from "./Model";
import { Suspense } from "react";
import Leva from "./Leva";
import Simplescene from "./Simplescene";
import { Environment, OrbitControls, useHelper } from "@react-three/drei";
import Envscene from "./Envscene";
import OrbitcontrolsScene from "./OrbitcontrolsScene";
import PresentationCTScene from "./PresentationCTScene";
import PCTScene from "./PCTScene";
import Html3dtext from "./html3dtext";
import ShadersScene from "./ShadersScene";
import PortalScene from "./PortalScene";
import CubeLooking from "./CubeLooking";
import ModelConvert from "./ModelConvert";
// extend({ OrbitControls: OrbitControls });


const Scene = () => {
    // const cuberef = useRef();
    // const { camera, gl } = useThree();
    // camera.position.x = 1;
    // camera.position.y = 4;
    // camera.position.z = 5;
    // const lightref = useRef();

    // useHelper(lightref,THREE.DirectionalLightHelper,1)



    // useFrame((state, delta) => {
    //     cuberef.current.rotation.y += delta;
    // })

    // const texture = useLoader(THREE.TextureLoader,"./img/1.jpg");
    // console.log(texture);
    return (
        <>
            {/* TO ADD ORBITCONTROLS */}
            {/* <orbitControls args={[camera, gl.domElement]} /> */}
            {/* <OrbitControls /> */}
            {/* TO ADD AXES AND GRID HELPER */}
            {/* <axesHelper args={[5]} />
            <gridHelper args={[20, 20, "red"]} /> */}

            {/* CREATED A CUSTOM TRIANGLE MESH */}
            {/* <Custommesh /> */}


            {/* ADDING A NEW MESH */}
            {/* <mesh scale={1.5} position={[2,0,0]}  >
                <boxGeometry />
                <meshBasicMaterial color="green" />
            </mesh>
            <mesh scale={1.5} position={[-2,0,0]}>
                <boxGeometry />
                <meshBasicMaterial color="red" />
            </mesh> */}

            {/* ADDING A TEXTURE USING USELOADER */}
            {/* <mesh scale={1.5} >
                <boxGeometry />
                <meshBasicMaterial map={texture} />
            </mesh> */}

            {/* TO ADD PARTICLES IN THE SCENE */}
            {/* <Particles /> */}

            {/* ADDING A SUSPENSE SO THAT THE PAGE WILL LOAD ON ITS ON TIME */}
            {/* <Suspense fallback={
                <mesh position={[0,1.5,0.5]} scale={2}>
                    <boxGeometry/>
                    <meshBasicMaterial wireframe/>
                </mesh>
            } >
                <Model />
            </Suspense> */}

            {/* LEWA CONTROLS */}
            {/* <Leva /> */}

            {/* TO SEE MOUSE EVENTS */}
            {/* <Simplescene/> */}

            {/* <directionalLight ref={lightref} position={[0,5,0]} /> */}

            {/* IMPORTING ENVIRONMENT SCENE */}



            {/* ORBITAL CONTROLS */}
            {/* <OrbitcontrolsScene /> */}

            {/* <PresentationCTScene /> */}
            {/* <PCTScene /> */}

            {/* 3D HTML TEXT */}
            {/* <Html3dtext /> */}

            {/* SHADERS */}
            {/* <ShadersScene /> */}

            {/* PORTAL SCENE */}
            {/* <PortalScene/> */}


            {/* CUBE LOOKING */}
            {/* <CubeLooking /> */}

            {/* GLTF TO JS */}
            <ModelConvert />








        </>


    )
}

export default Scene