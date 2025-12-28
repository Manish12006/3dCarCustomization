import React, { useEffect, useRef } from 'react'
import Porche from './Porche'
import { OrbitControls, Sky, useGLTF, Environment, ContactShadows, Float, Html, PositionalAudio } from '@react-three/drei'
import * as THREE from "three"
import { useControls } from 'leva'
import { useFrame, useThree } from '@react-three/fiber'
import gsap from 'gsap'
import { useState } from 'react'








const MainScene = () => {
    const garagemodel = useGLTF('./model/neon_garage.glb')
    const { camera } = useThree();
    const controlsRef = useRef();
    const [envPreset, setEnvPreset] = useState("sunset")
    const [carColor, setCarColor] = useState('#ff0000')
    const [carSpoiler, setCarSpoiler] = useState("nothing")
    const [carTyreType, setCarTyreType] = useState("default")
    const [carmetal, setcarmetal] = useState(0.40)
    const [carrough, setcarrough] = useState(0.10)
    const audioRef = useRef();
    const audioRefbg = useRef();
    const handlePlay = () => {
        if (audioRef.current && !audioRef.current.isPlaying) {
            audioRef.current.play();
        }
    };
    const handlePlaybg = () => {
        if (audioRefbg.current) {

            if (!audioRefbg.current.isPlaying) {
                audioRefbg.current.play();
            }
        }
    };

    useEffect(() => {
        handlePlaybg();
    }, [])

    const [rotationY, setRotationY] = React.useState(Math.PI / 2);
    const groupRef = useRef();
    const [targetRotation, setTargetRotation] = useState(0);

    const targetPosition = new THREE.Vector3(104.450, 37.362, 101.276);
    const animationProgress = useRef(0);
    const hasAnimated = useRef(false);


    function easeInOutQuad(t) {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }

    useEffect(() => {
        camera.position.set(104.450, 20, 50.276);
    }, [camera]);

    useFrame(() => {
        if (hasAnimated.current) return;

        animationProgress.current += 0.01;
        const t = Math.min(animationProgress.current, 1);
        const easedT = easeInOutQuad(t);

        camera.position.lerpVectors(
            new THREE.Vector3(104.450, 50, 101.276),
            targetPosition,
            easedT
        );

        camera.lookAt(0, 0, 0);

        if (t >= 1) {
            hasAnimated.current = true;
        }
    });





    function rotateCar(direction) {
        setTargetRotation((prev) => {
            if (direction === 'next') return prev - Math.PI / 1;
            else return prev + Math.PI / 1;
        });
    }

    useEffect(() => {
        console.log("Camera Position:", camera.position);
        console.log("Camera Target (Focus Point):", controlsRef.current.target);
    }, [])




    const focusCameraOnInput = () => {
        // Animate camera position
        gsap.to(camera.position, {
            x: 75.556,
            y: 20.390,
            z: 53.26947,
            duration: 2,
            ease: "power3.inOut",
            onUpdate: () => {
                controlsRef.current.update();
            }
        });

        // Animate camera target (controls)
        gsap.to(controlsRef.current.target, {
            x: 0,
            y: 0,
            z: 0,
            duration: 2,
            ease: "power3.inOut",
            onUpdate: () => {
                controlsRef.current.update();
            }
        });
        handlePlay();
    };

    const focusCameraOnSpoiler = () => {
        // Animate camera position
        gsap.to(camera.position, {
            x: 58.4189,
            y: 39.8837,
            z: 107.6194,
            duration: 2,
            ease: "power3.inOut",
            onUpdate: () => {
                controlsRef.current.update();
            }
        });

        // Animate camera target (controls)
        gsap.to(controlsRef.current.target, {
            x: 0,
            y: 0,
            z: 0,
            duration: 2,
            ease: "power3.inOut",
            onUpdate: () => {
                controlsRef.current.update();
            }
        });
        handlePlay();
    };

    const focusCameraOnEnv = () => {
        // Animate camera position
        gsap.to(camera.position, {
            x: 135.00626,
            y: 54.7016,
            z: 105.7404,
            duration: 2,
            ease: "power3.inOut",
            onUpdate: () => {
                if (controlsRef.current) controlsRef.current.update();
            }
        });

        // Animate camera target (controls)
        gsap.to(controlsRef.current.target, {
            x: 0,
            y: 0,
            z: 0,
            duration: 2,
            ease: "power3.inOut",
            onUpdate: () => {
                if (controlsRef.current) controlsRef.current.update();
            }
        });
        handlePlay();
    };

    const focusCameraOnColor = () => {
        // Animate camera position
        gsap.to(camera.position, {
            x: 117.0222,
            y: 37.9426,
            z: -72.310,
            duration: 2,
            ease: "power3.inOut",
            onUpdate: () => {
                controlsRef.current.update();
            }
        });

        // Animate camera target (controls)
        gsap.to(controlsRef.current.target, {
            x: 0,
            y: 0,
            z: 0,
            duration: 2,
            ease: "power3.inOut",
            onUpdate: () => {
                controlsRef.current.update();
            }
        });
        handlePlay();
    };


    useFrame(() => {
        if (!groupRef.current) return;

        groupRef.current.rotation.y = THREE.MathUtils.lerp(
            groupRef.current.rotation.y,
            targetRotation,
            0.1 // smoothing factor (0.1 = smooth, 1 = instant)
        );
    });



    useEffect(() => {
        console.log('Current Camera Position:', camera.position)
        console.log('Current Orbit Target:', controlsRef.current.target)
    }, [])




    const PAN_LIMIT = {
        minX: -5,
        maxX: 5,
        minY: -1,
        maxY: 1,
        minZ: -5,
        maxZ: 5
    }

    useFrame(() => {
        if (!controlsRef.current) return

        const target = controlsRef.current.target

        // Clamp each axis
        target.x = Math.max(PAN_LIMIT.minX, Math.min(PAN_LIMIT.maxX, target.x))
        target.y = Math.max(PAN_LIMIT.minY, Math.min(PAN_LIMIT.maxY, target.y))
        target.z = Math.max(PAN_LIMIT.minZ, Math.min(PAN_LIMIT.maxZ, target.z))

        controlsRef.current.update()
    })




    useEffect(() => {
        garagemodel.scene.traverse((child) => {
            if (child.isMesh) {
                // Reduce metalness and increase roughness for less reflection
                if (child.material) {
                    child.material.metalness = 1  // Lower = less mirror-like
                    child.material.roughness = 0.3  // Higher = more diffuse
                    child.material.envMapIntensity = 0.7 // Controls reflection strength
                    child.material.needsUpdate = true
                }
            }
        })
    }, [garagemodel])

    const btnStyle = {
        width: '100%',
        padding: '8px',
        marginBottom: '10px',
        fontSize: '14px',
        borderRadius: '5px',
        border: 'none',
        cursor: 'pointer',
        backgroundColor: '#444',
        color: 'white',
    }

    const labelStyle = {
        display: 'block',
        marginBottom: '5px',
        fontWeight: 'bold',
        marginTop: '10px'
    }

    const inputStyle = {
        width: '100%',
        padding: '6px',
        borderRadius: '5px',
        border: '1px solid #555',
        fontSize: '14px',
        backgroundColor: '#222',
        color: 'white'
    }

    const buttonStyle = {
        padding: '6px',
        fontSize: '12px',
        border: 'none',
        borderRadius: '4px',
        backgroundColor: '#444',
        color: 'white',
        cursor: 'pointer',
        width: '100%',
    };

    useEffect(() => {
        const audio = new Audio('/sounds/bg.mp3'); // Replace with your file path
        audio.loop = true;
        audio.volume = 0.5; // Optional: Set volume (0 to 1)
        audio.play().catch((e) => console.log('Autoplay blocked:', e));

        return () => audio.pause(); // Cleanup on unmount
    }, []);


    return (
        <>
            <PositionalAudio ref={audioRef}
                url="/sounds/click1.mp3"
                distance={100}
                loop={false} />
            <PositionalAudio ref={audioRefbg}
                url="/sounds/bg.mp3"
                distance={70}
                loop={true} />

            <OrbitControls ref={controlsRef}

                minAzimuthAngle={-0.58}
                maxAzimuthAngle={2.13}
                maxPolarAngle={1.53}
                minPolarAngle={0.90}
                minDistance={5}
                maxDistance={180}
                enablePan={false}
                panSpeed={1}
                dampingFactor={0.02}
                zoomSpeed={1}
            />
            {/* Realistic Sky */}
            {/* <Sky
                sunPosition={[10, 15, 10]}
                turbidity={6}
                rayleigh={0.5}
                mieCoefficient={0.005}
                mieDirectionalG={0.8}
            /> */}

            {/* Environment lighting with better reflections */}
            <Environment preset={envPreset} background={true} />
            {/* <Environment preset="night" background={false} /> */}

            {/* Ambient light for soft fill */}
            <ambientLight intensity={0.3} />

            {/* Directional light as the main sun light with shadows */}
            <directionalLight
                castShadow
                position={[10, 20, 10]}
                intensity={1.5}
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
                shadow-camera-far={50}
                shadow-camera-left={-10}
                shadow-camera-right={10}
                shadow-camera-top={10}
                shadow-camera-bottom={-10}
            />

            {/* Contact shadows under the car for grounding */}
            <ContactShadows
                rotation-x={Math.PI / 2}
                position={[0, 0.01, 0]}
                opacity={0.4}
                width={10}
                height={10}
                blur={2}
                far={10}
            />

            {/* Models */}
            <primitive object={garagemodel.scene} castShadow receiveShadow />
            <group ref={groupRef}>
                <Porche castShadow receiveShadow
                    scale={5.2}

                    position-x={3}
                    position-y={2.3}
                    bodyColor={carColor}
                    carSpoiler={carSpoiler}
                    tyretype={carTyreType}
                    CarMetal={carmetal}
                    CarRough={carrough}
                    rotation-y={rotationY}


                />
            </group>

            {/* <Float position={[0, 4, 0]} floatIntensity={0} scale={6} rotation-y={2}>
                <Html
                    transform
                    position={[-10, 4, 0]} // tweak position to place on screen
                    
                    style={{
                        width: '250px',
                        padding: '20px',
                        background: 'rgba(0,0,0,0.6)',
                        color: 'white',
                        borderRadius: '10px',
                        fontSize: '14px',
                        pointerEvents: 'auto'
                    }}
                >
                    <div>
                        <h3>Car Controls</h3>
                        <label>Body Color:</label><br />
                        <input type="color" onChange={(e) => console.log(e.target.value)} /><br /><br />

                        <label>Wheel Size:</label><br />
                        <input type="range" min="1" max="5" step="0.1" /><br />
                    </div>
                </Html>
            </Float> */}

            <Html transform={false}>
                <div
                    onPointerDown={(e) => e.stopPropagation()}
                    onPointerMove={(e) => e.stopPropagation()}
                    onWheel={(e) => e.stopPropagation()}


                    style={{
                        position: 'fixed',
                        bottom: '-175px',      // 10px from bottom edge
                        left: '10px',        // 10px from left edge
                        transform: 'translate(-430%, 25%)', // move it left by 50% of its width
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '20px',
                        zIndex: 10,
                        userSelect: 'none',
                        fontFamily: 'Arial, sans-serif',
                        width: '220px',
                    }}

                // style={{
                //     position: 'fixed',
                //     bottom: '-200px',      // 10px from bottom edge
                //     left: '220px',        // 10px from left edge
                //     transform: 'translate(-430%, 25%)', // move it left by 50% of its width
                //     display: 'flex',
                //     flexDirection: 'column',
                //     gap: '20px',
                //     zIndex: 10,
                //     userSelect: 'none',
                //     fontFamily: 'Arial, sans-serif',
                //     width: '220px',
                // }}


                >
                    {/* Environment Panel */}
                    <div style={{
                        width: '260px',
                        padding: '15px',
                        background: 'rgba(0,0,0,0.7)',
                        color: 'white',
                        borderRadius: '10px'
                    }}>
                        <h3 style={{ marginTop: 0, marginBottom: '10px' }}>Environment</h3>
                        <label style={labelStyle}>Change Environment</label>
                        <select style={inputStyle} value={envPreset} onChange={(e) => setEnvPreset(e.target.value)} onClick={focusCameraOnEnv} >
                            <option value="sunset" onClick={handlePlay} >Sunset</option>
                            <option value="night" onClick={handlePlay} >Night</option>
                            <option value="forest" onClick={handlePlay} >Forest</option>
                            <option value="studio" onClick={handlePlay} >Studio</option>
                            <option value="city" onClick={handlePlay} >City</option>
                            <option value="dawn" onClick={handlePlay} >Dawn</option>
                            <option value="park" onClick={handlePlay} >Park</option>
                        </select>
                    </div>

                    {/* Select Car Panel
                    <div style={{
                        width: '260px',
                        padding: '15px',
                        background: 'rgba(0,0,0,0.7)',
                        color: 'white',
                        borderRadius: '10px'
                    }}>
                        <h3 style={{ marginTop: 0, marginBottom: '10px' }}>Select Car</h3>
                        <label style={labelStyle}>Select Car</label>
                        <select style={inputStyle} onChange={(e) => console.log('Select car:', e.target.value)}>
                            <option value="porche">Porche</option>

                        </select>
                    </div> */}

                    {/* Car Controls Panel */}
                    <div style={{
                        width: '250px',
                        padding: '20px',
                        background: 'rgba(0,0,0,0.7)',
                        color: 'white',
                        borderRadius: '10px',

                    }}>
                        <h3 style={{ marginTop: 0, marginBottom: '10px' }}>Car Controls</h3>
                        <br></br>

                        <label style={labelStyle} >Body Color</label>
                        <input
                            type="color"
                            style={inputStyle}
                            value={carColor}
                            onChange={(e) => setCarColor(e.target.value)}
                            onClick={focusCameraOnColor}
                        />
                        <br></br><br></br>
                        <label style={labelStyle}>Body Metalness</label>
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={carmetal}
                            onChange={(e) => { setcarmetal(e.target.value) }}
                            style={inputStyle}
                        />
                        <br></br><br></br>
                        <label style={labelStyle}>Body Roughness</label>
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={carrough}
                            onChange={(e) => { setcarrough(e.target.value) }}

                            style={inputStyle}
                        />

                        {/* Rim Finish Buttons */}
                        <div style={{ marginTop: '20px' }}>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginTop: '10px' }}>
                                {/* Matte */}
                                <button style={buttonStyle} onClick={() => { setcarmetal(0.6); setcarrough(0.8); handlePlay(); }}>Matte</button>

                                {/* Satin */}
                                <button style={buttonStyle} onClick={() => { setcarmetal(0.7); setcarrough(0.5); handlePlay(); }}>Satin</button>

                                {/* Glossy */}
                                <button style={buttonStyle} onClick={() => { setcarmetal(0.9); setcarrough(0.2); handlePlay(); }}>Glossy</button>

                                {/* Chrome */}
                                <button style={buttonStyle} onClick={() => { setcarmetal(1.0); setcarrough(0.05); handlePlay(); }}>Chrome</button>

                                {/* Gunmetal */}
                                <button style={buttonStyle} onClick={() => { setcarmetal(0.8); setcarrough(0.4); handlePlay(); }}>Gunmetal</button>

                                {/* Brushed */}
                                <button style={buttonStyle} onClick={() => { setcarmetal(0.8); setcarrough(0.3); handlePlay(); }}>Brushed</button>
                            </div>
                        </div>
                        <br></br>


                        <button
                            style={{
                                marginTop: '10px',
                                padding: '8px',
                                border: 'none',
                                borderRadius: '5px',
                                backgroundColor: '#555',
                                color: 'white',
                                cursor: 'pointer',
                                width: '100%',
                                backgroundColor: 'blue'
                            }}
                            onClick={() => {
                                setcarmetal(0.4)
                                setcarrough(0.1)
                                handlePlay();
                            }}
                        >RESET</button>
                        <br></br><br></br>


                        <label style={labelStyle}>Tyre Type</label>
                        <select style={inputStyle} onChange={(e) => setCarTyreType(e.target.value)} onClick={focusCameraOnInput}>
                            <option value="default" onClick={handlePlay}  >Default</option>
                            <option value="tyre1" onClick={handlePlay}>Type 1</option>
                            <option value="tyre2" onClick={handlePlay} >Type 2</option>
                            <option value="tyre3" onClick={handlePlay} >Type 3</option>
                        </select>

                        {/* <label style={labelStyle}>Tyre Rims</label>
                        <select style={inputStyle} onChange={(e) => console.log('Change rims:', e.target.value)}>
                            <option value="chrome">Chrome</option>
                            <option value="matte">Matte</option>
                            <option value="carbon">Carbon</option>
                        </select> */}
                        <br></br><br></br>

                        <label style={labelStyle}>Add Car Spoilers</label>
                        <select style={inputStyle} onChange={(e) => setCarSpoiler(e.target.value)} onClick={focusCameraOnSpoiler}>
                            <option value="nothing" onClick={handlePlay} >Nothing</option>
                            <option value="spoiler1" onClick={handlePlay} >Type 1</option>
                            <option value="spoiler2" onClick={handlePlay} >Type 2</option>
                            <option value="spoiler3" onClick={handlePlay} >Type 3</option>
                        </select>
                        <br></br><br></br>

                        {/* Rotation Controls */}
                        <label style={labelStyle}>Car Inspect</label>
                        <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between', gap: '30px' }} >
                            <button
                                style={{
                                    ...buttonStyle,
                                    flex: 1,
                                    backgroundColor: 'transparent',
                                    border: '2px solid red'
                                }}
                                onClick={() => { rotateCar('prev'); handlePlay(); }}
                            >
                                Flip Left
                            </button>
                            <button
                                style={{
                                    ...buttonStyle,
                                    flex: 1,
                                    backgroundColor: 'transparent',
                                    border: '2px solid blue'
                                }}
                                onClick={() => { rotateCar('next'); handlePlay(); }}

                            >
                                Flip Right
                            </button>
                        </div>

                    </div>
                </div>
            </Html>





        </>
    )
}

export default MainScene
