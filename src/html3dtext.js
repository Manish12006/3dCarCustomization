import { Center, OrbitControls, Text, Text3D, Float, Html } from '@react-three/drei'
import { useRef } from 'react';
import '../src/App.css'


const Html3dtext = () => {
    const cuberef1 = useRef();

    return (
        <>
            <OrbitControls />
            <gridHelper args={[10,10,"blue"]}></gridHelper>

            {/* <Text fontSize={2} color="orange" font='./fonts/1.ttf' maxWidth={2} textAlign='center'  >
                HELLO THERE
            </Text> */}
            <ambientLight />
            <mesh ref={cuberef1}>

                <boxGeometry />
                <meshStandardMaterial color="aqua" />
                <Html occlude={[cuberef1]} position={[-0.6, 0.5, 0.5]}
                    wrapperClass="text"
                    distanceFactor={5}>
                    HELLO
                </Html>
            </mesh>
        </>
    )
}

export default Html3dtext