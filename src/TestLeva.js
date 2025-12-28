import { click } from '@testing-library/user-event/dist/click';
import { useControls,button } from 'leva';
import React from 'react'
import { MeshBasicMaterial } from 'three';


const TestLeva = () => {

    const {position,scalemodal,color}=useControls("cube",{
        position:{
            value:{
                x:0,
                y:0.5,
                z:0
            },
            min:-10,
            max:10,
            step:0.01
        },
        scalemodal:{
            options:[1,2,3,4,5,6,7,8,9,10]

        },
        color:"#ffffff",
        clickCube:button(()=>{
            console.log("button clicked");
        })
    })

    const {pos} = useControls("sphere",{
        pos:{
            value:{
                x:0,
                y:0,
                z:0
            }
        }
    })

    
    
  return (
    <>
        <mesh position={[position.x,position.y,position.z]} scale={scalemodal}>
            <boxGeometry />
            <meshBasicMaterial color={color} />
        </mesh>
        <mesh position={[pos.x,pos.y,pos.z]} scale={scalemodal}>
            <sphereGeometry />
            <meshBasicMaterial color={color} />
        </mesh>
    </>
  );
}

export default TestLeva