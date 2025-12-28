import { useLoader } from "@react-three/fiber";

// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useEffect } from "react";
const Model = () => {
    const model = useGLTF("/model/model.glb");
    // console.log(model)
    // const animations = useAnimations(model.animations,model.scene)
    // console.log(animations);

    // useEffect(()=>{
    //     animations.actions.Scene.play();

    // },[]);

    return (
        <>
            <ambientLight intensity={5} />


            <primitive
                object={model.scene}
                position={[0, 1.5, 0.5]}
                scale={1.5}
            />

        </>
    );
}

useGLTF.preload("/model/model5.glb")
export default Model