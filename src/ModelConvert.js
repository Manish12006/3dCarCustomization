import { OrbitControls, useGLTF } from '@react-three/drei'
import React from 'react'
import Carnew from './Carnew'
import Carglb from './Carglb'
import Carfinal from './Carfinal'
import Cartemp from './Cartemp'
import Car from './Car'
import Carblender from './Carblender'
import Car_F from './Car_F'
import CarB from './CarB'
import Porche from './Porche'




const ModelConvert = () => {
    const model = useGLTF("./model/carnew.glb")
    return (
        <>
            <OrbitControls />

            <ambientLight intensity={5} />
            <directionalLight args={[10, 10]} />
            
            <Porche />



        </>
    )
}

export default ModelConvert
