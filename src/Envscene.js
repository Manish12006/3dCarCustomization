import { CameraControls, Cloud, CubeCamera, Environment, OrbitControls, Sky, Sparkles, Stars, useAnimations, useHelper } from "@react-three/drei";
import { useEffect, useRef } from "react";
import * as THREE from "three"
import { useGLTF } from "@react-three/drei";
import { useControls, buttonGroup, button } from "leva";
import { useFrame, useThree } from "@react-three/fiber";
import UCscene from "./UCscene";
import { DEG2RAD } from "three/src/math/MathUtils.js";







export const Envscene = () => {
    const lightref = useRef();
    const model = useGLTF("./model/heart.glb");
    const animations = useAnimations(model.animations, model.scene)
    console.log(animations)
    const { camera, gl } = useThree();
    console.log(model)
    const cubeRef = useRef();
    const { position, camera1 } = useControls("heart", {
        position: {
            value: { x: 0, y: -2, z: 0 },
            min: -100,
            max: 100,
            step: 0.01
        },

    });
    const cameraref = useRef();
    const { DEG2RAD } = THREE.MathUtils;

    const cameracontrols = useControls("Camera Controls", {
        horizontalgroup: buttonGroup({
            opts: {
                "45deg": () => { cameraref.current.rotate(45 * DEG2RAD, 0, true) },
                "-90deg": () => { cameraref.current.rotate(-90 * DEG2RAD, 0, true) },
                "180deg": () => { cameraref.current.rotate(180 * DEG2RAD, 0, true) },
            }
        }),
        verticalgroup: buttonGroup({
            opts: {
                "20deg": () => { cameraref.current.rotate(0, 20 * DEG2RAD, true) },
                "-40deg": () => { cameraref.current.rotate(0, -40 * DEG2RAD, true) },

            }
        }),
        zoomgroup: buttonGroup({
            opts: {
                "0.25": () => { cameraref.current.zoom(0.25, true) },
                "-0.25": () => { cameraref.current.zoom(-0.25, true) },

            }
        }),
        truckgroup: buttonGroup({
            opts: {
                "(1,0)": () => { cameraref.current.truck(1, 0, true) },
                "(0,1)": () => { cameraref.current.truck(0, 1, true) },
                "(1,-1)": () => { cameraref.current.truck(1, -1, true) },
            }
        }),
        lookAt: button(() => {
            cameraref.current.setLookAt(0, 1, 3, 0, 0, 0, true);
        })

    })

    // const handleanimation = () => {
    //     const action = animations.actions["Take 001"];
    //     action.play();
    //     action.setLoop(THREE.LoopOnce, 1)
    //     action.reset();

    // }

    // useEffect(() => {
    //     camera.position.x = -0.26;
    //     camera.position.y = 0.67;
    //     camera.position.z = 8.77;
    //     camera.fov = 60;
    //     camera.updateProjectionMatrix();

    // }, [])



    // useHelper(lightref, THREE.DirectionalLightHelper, 1)
    return (
        <>
            {/* <OrbitControls /> */}
            <axesHelper args={[5]} />
            <gridHelper args={[20, 20, "red"]} />
            {/* <gridHelper args={[20, 20, "red"]} />
            <directionalLight ref={lightref} position={[2, 5, 0]} intensity={2} castShadow />*/}


            {/* <mesh position={[0, 0.76, 0]} scale={1.5} castShadow>
                <boxGeometry />
                <meshStandardMaterial />
            </mesh>
            <mesh rotation-x={-Math.PI * 0.5} receiveShadow >
                <planeGeometry args={[10, 10]} />
                <meshStandardMaterial color="red" side={THREE.DoubleSide} />
            </mesh> */}

            {/* <Sparkles scale={[10,10,10]} count={500} speed={0.5} opacity={3} size={1}/> */}

            {/* <Stars count={2000} radius={2} depth={100} saturation={0} fade speed={1} /> */}
            {/* <Sky sunPosition={[10,10,10]} /> */}
            <ambientLight />
            {/* <Cloud color="white" opacity={1} speed={0.2} width={10} segments={50}/> */}

            {/* <primitive object={model.scene}
                position={[position.x, position.y, position.z]}
                scale={[0.06, 0.06, 0.06]}
                onClick={(e) => {
                    e.stopPropagation();
                }}></primitive> */}

            {/* ENVIRONMENT ADDITION */}
            {/* <Environment files={"./hdri/1.hdr"} background /> */}

            {/* ADDING A CUBE CAMERA SO THAT WE CAN SEE REFLECTION OF OTHER THINGS */}
            {/* <CubeCamera resolution={1024} frames={1}>
                {(texture) => (
                    <mesh>
                        <sphereGeometry />
                        <meshStandardMaterial
                            envMap={texture}
                            roughness={0}
                            metalness={0.9}
                        />
                    </mesh>
                )}
            </CubeCamera>
            <mesh ref={cubeRef} position-x={5}>
                <boxGeometry />
                <meshBasicMaterial color="purple" />
            </mesh> */}

            {/* <UCscene/> */}

            <CameraControls ref={cameraref} />
            <mesh scale={2} >
                <boxGeometry />
                <meshBasicMaterial color="red" />
            </mesh>







        </>
    );
}

export default Envscene
