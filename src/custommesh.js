import * as three from "three"

const custommesh = () => {
    const positionArray =new Float32Array([0,0,0,0,1,0,1,0,0]);
    
  return(
    <mesh>
        <bufferGeometry>
            <bufferAttribute attach="attributes-position" count={3} itemSize={3} array={positionArray} />
        </bufferGeometry>
        <meshBasicMaterial color="white" side={three.DoubleSide}/>
    </mesh>
  );
}

export default custommesh