import { OrbitControls } from '@react-three/drei'
import React from 'react'


export const OrbitcontrolsScene = () => {
    return (

        <>
            <OrbitControls
                // enableDamping={true}
                // dampingFactor={0.25}
                // autoRotate={true}
                // autoRotateSpeed={2}
                maxAzimuthAngle={Math.PI / 2}
                minAzimuthAngle={-Math.PI / 2}
                maxPolarAngle={Math.PI /4}
                minPolarAngle={-Math.PI /4}
                

            />
            <gridHelper args={[10, 10, "red"]} />
            <ambientLight />
            <mesh>
                <boxGeometry />
                <meshStandardMaterial color="white" />
            </mesh>
        </>
    )
}

export default OrbitcontrolsScene
