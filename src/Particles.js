import { SphereGeometry } from "three";
import { useLoader } from "@react-three/fiber";
import * as THREE from "three"
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";




const Particles = () => {
    const particleref = useRef();

    const texture = useLoader(THREE.TextureLoader,"./img/snow.png");
    const verticesAmount = 2000;
    const positionArray = new Float32Array(verticesAmount*3);
    for(let i = 0;i<verticesAmount*3;i++){
        positionArray[i] = (Math.random()-0.5)*10;
    }
    useFrame((state,delta)=>{
        particleref.current.position.y += delta*(-0.02);
        particleref.current.position.x += delta*(Math.sin(0.01))
    })
    
  return(
    <points ref={particleref} >
        <bufferGeometry>
            <bufferAttribute attach="attributes-position" count={positionArray.length} itemSize={3} array={positionArray} />
        </bufferGeometry>

        <pointsMaterial size={0.02} alphaMap={texture} transparent depthTest={false} />
    </points>

  );
}

export default Particles