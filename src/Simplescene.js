import { OrbitControls, useGLTF } from "@react-three/drei";
import { useState } from "react";


const Simplescene = () => {
    const model = useGLTF("./model/Room1k.glb")

    return (
        <>
            <OrbitControls />
            
            <primitive object={model.scene} />
            <ambientLight intensity={2} />
        </>
    );
}

export default Simplescene