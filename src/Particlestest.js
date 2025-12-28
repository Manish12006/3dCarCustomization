import { useFrame, useLoader } from "@react-three/fiber";
import { useRef } from "react";
import { BoxGeometry, TextureLoader } from "three";


const Particlestest = () => {
    const particleref = useRef();
    const texture = useLoader(TextureLoader,"./img/snow.png");
    const verticesamount = 2000;
    const positionArray = new Float32Array(verticesamount * 3);
    for (let i = 0; i < verticesamount * 3; i++) {
        positionArray[i] = (Math.random() - 0.5) * 10;
    }

    useFrame((state,delta) => {
        particleref.current.rotation.x +=delta*0.05;
    })
    return (
        <>
            <points ref={particleref} >
                <bufferGeometry>
                    <bufferAttribute attach="attributes-position" count={positionArray.length} itemSize={3} array={positionArray} />
                </bufferGeometry>
                <pointsMaterial size={0.02} alphaMap={texture} transparent depthTest={true}/>
            </points>
        </>

    );
}

export default Particlestest